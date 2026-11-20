(() => {
  if (!window.L) return;

  const campus = { name: 'UFRB · Campus Cruz das Almas', coords: [-12.6681, -39.0767] };
  const routes = [
    {
      id: 'blue', color: '#3478a5', stops: [
        { name: 'Pedra do Cavalo', coords: [-12.5861, -38.9972], kind: 'Usina hidrelétrica' },
        { name: 'Cachoeira', coords: [-12.6014, -38.9658], kind: 'Município' },
        { name: 'Governador Mangabeira', coords: [-12.6020, -39.0428], kind: 'Município' },
        { name: 'Cruz das Almas', coords: [-12.6672, -39.1010], kind: 'Município' },
        campus
      ]
    },
    {
      id: 'green', color: '#4d8057', stops: [
        { name: 'Complexo Paulo Afonso', coords: [-9.3970, -38.2015], kind: 'Geração hidrelétrica' },
        { name: 'Paulo Afonso', coords: [-9.4080, -38.2220], kind: 'Município' },
        { name: 'Rede CHESF', coords: [-10.9500, -38.7000], kind: 'Conexão ilustrativa da rede' },
        { name: 'Governador Mangabeira', coords: [-12.6020, -39.0428], kind: 'Município' },
        { name: 'Cruz das Almas', coords: [-12.6672, -39.1010], kind: 'Município' },
        campus
      ]
    },
    {
      id: 'yellow', color: '#b38728', stops: [
        { name: 'Complexos Eólicos da Bahia', coords: [-11.5500, -41.1600], kind: 'Área de referência eólica · posição ilustrativa' },
        { name: 'Subestação Sapeaçu', coords: [-12.7172, -39.1853], kind: 'Subestação' },
        { name: 'Cruz das Almas', coords: [-12.6672, -39.1010], kind: 'Município' },
        campus
      ]
    }
  ];

  routes.forEach((route) => {
    const element = document.querySelector(`#route-map-${route.id}`);
    if (!element) return;

    const map = L.map(element, { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const points = route.stops.map((stop, index) => {
      const marker = L.circleMarker(stop.coords, {
        radius: index === route.stops.length - 1 ? 8 : 6,
        color: '#fff', weight: 2, fillColor: route.color, fillOpacity: 1
      }).addTo(map);
      marker.bindPopup(`<strong>${stop.name}</strong><br><small>${stop.kind || 'Etapa da rota'}</small>`);
      marker.bindTooltip(`${String(index + 1).padStart(2, '0')} · ${stop.name}`, {
        direction: 'top', offset: [0, -7], opacity: 0.94
      });
      return stop.coords;
    });

    L.polyline(points, { color: route.color, weight: 3, opacity: 0.85, dashArray: '7 7' }).addTo(map);
    map.fitBounds(points, { padding: [24, 24] });
    window.addEventListener('load', () => map.invalidateSize());
  });
})();
