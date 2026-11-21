(() => {
  const mapElement = document.querySelector('#bdgd-map');
  if (!mapElement) return;

  const status = document.querySelector('#bdgd-status');
  if (!window.L) {
    status.textContent = 'Não foi possível carregar o componente do mapa.';
    return;
  }

  const API_BASE_URL = (window.BDGD_API_URL || 'http://localhost:8000').replace(/\/$/, '');
  const map = L.map(mapElement).setView([-12.6681, -39.0767], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const layers = {
    SSDMT: L.geoJSON(null, { style: { color: '#d18a38', weight: 3 } }),
    SSDBT: L.geoJSON(null, { style: { color: '#627fba', weight: 2 } }),
    UNTRD: L.geoJSON(null, { pointToLayer: (_, latlng) => L.circleMarker(latlng, { radius: 5, color: '#315943', fillColor: '#e9bd58', fillOpacity: 0.95, weight: 2 }) }),
    SUB: L.geoJSON(null, { style: { color: '#315943', fillColor: '#78917a', fillOpacity: 0.35, weight: 2 } })
  };
  Object.values(layers).forEach((layer) => {
    layer.addTo(map);
    layer.bindPopup((featureLayer) => {
      const properties = featureLayer.feature?.properties || {};
      const content = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = properties.nome || 'Ativo da rede';
      content.append(name);
      if (properties.codigo) {
        const code = document.createElement('small');
        code.textContent = `Código: ${properties.codigo}`;
        content.append(document.createElement('br'), code);
      }
      if (properties.tensao_kv) {
        const voltage = document.createElement('small');
        voltage.textContent = `Tensão nominal: ${properties.tensao_kv} kV`;
        content.append(document.createElement('br'), voltage);
      }
      return content;
    });
  });

  let refreshVersion = 0;
  async function refresh() {
    const requestVersion = ++refreshVersion;
    const bounds = map.getBounds();
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()].join(',');
    const enabled = [...document.querySelectorAll('[data-bdgd-layer]:checked')].map((input) => input.dataset.bdgdLayer);

    if (enabled.length === 0) {
      Object.values(layers).forEach((layer) => layer.clearLayers());
      status.textContent = 'Selecione ao menos uma camada para exibir os dados.';
      return;
    }

    status.textContent = 'Carregando feições da área visível…';
    try {
      const query = new URLSearchParams({ bbox, layers: enabled.join(',') });
      const response = await fetch(`${API_BASE_URL}/api/features?${query}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (requestVersion !== refreshVersion) return;

      const currentEnabled = new Set(
        [...document.querySelectorAll('[data-bdgd-layer]:checked')].map((input) => input.dataset.bdgdLayer)
      );
      Object.entries(layers).forEach(([name, layer]) => {
        layer.clearLayers();
        if (currentEnabled.has(name)) layer.addData(result.layers[name]);
      });
      status.textContent = `${result.count} elementos na área visível · data-base ${result.reference_date || 'não informada'}`;
    } catch (error) {
      if (requestVersion === refreshVersion) {
        status.textContent = 'Não foi possível acessar a API BDGD. Configure o serviço e confirme se está em execução.';
      }
    }
  }

  let timer;
  map.on('moveend', () => { clearTimeout(timer); timer = setTimeout(refresh, 180); });
  document.querySelectorAll('[data-bdgd-layer]').forEach((input) => input.addEventListener('change', refresh));
  refresh();
})();
