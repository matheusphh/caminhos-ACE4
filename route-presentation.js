(() => {
  const routes = {
    blue: { name: 'ROTA AZUL', places: [
      { place: 'Pedra do Cavalo', kind: 'Usina hidrelétrica', label: 'GERAÇÃO · PEDRA DO CAVALO', image: 'src/rota_1/Pedra_do_cavalo.jpeg', alt: 'Barragem de Pedra do Cavalo', text: 'A usina hidrelétrica aproveita a água represada para movimentar turbinas e gerar eletricidade. Esta é uma das possibilidades de origem para contar a jornada até a UFRB.', detail: 'A barragem fica no rio Paraguaçu, entre os municípios de Cachoeira e São Félix. A geração se conecta ao sistema elétrico.' },
      { place: 'Cachoeira', kind: 'Município · conexão esquemática', label: 'RECÔNCAVO · CACHOEIRA', image: 'src/rota_1/cidade-cachoeira2.webp', alt: 'Vista aérea do centro histórico de Cachoeira', text: 'Cachoeira está próxima ao reservatório de Pedra do Cavalo. A parada ajuda a situar a usina no território do Recôncavo Baiano.', detail: 'A linha desenhada no mapa é ilustrativa: não representa o traçado de uma linha elétrica entre estes pontos.' },
      { place: 'Governador Mangabeira', kind: 'Município · rede regional', label: 'RECÔNCAVO · GOVERNADOR MANGABEIRA', image: 'src/rota_1/Governador mangabeira.jpeg', alt: 'Vista de Governador Mangabeira', text: 'A rede elétrica interligada conecta diferentes regiões e distribuidoras. Os municípios nesta apresentação marcam uma aproximação geográfica do destino.', detail: 'Não é possível associar cada município a uma passagem física específica da energia nesta rota.' },
      { place: 'Cruz das Almas', kind: 'Distribuição local', label: 'DESTINO · CRUZ DAS ALMAS', image: 'src/rota_1/Cruz das almas.jpg', alt: 'Vista de Cruz das Almas', text: 'Em Cruz das Almas, a distribuidora atende a cidade por redes de distribuição. A rede local conduz eletricidade até os pontos de consumo.', detail: 'O mapa da rede da Coelba disponível nesta página mostra estruturas locais com base em dados da ANEEL.' },
      { place: 'UFRB · Campus Cruz das Almas', kind: 'Uso e geração local', label: 'CHEGADA · UFRB', image: 'src/rota_1/UFRB.jpeg', alt: 'Campus da UFRB em Cruz das Almas', text: 'No campus, a eletricidade apoia aulas, pesquisas, serviços e atividades cotidianas. A UFRB também conta com geração solar fotovoltaica integrada.', detail: 'A apresentação não atribui uma usina específica à energia consumida no campus: o SIN reúne geração de várias fontes.' }
    ] },
    green: { name: 'ROTA VERDE', places: [
      { place: 'Complexo Paulo Afonso', kind: 'Geração hidrelétrica', label: 'GERAÇÃO · PAULO AFONSO', image: 'src/rota_2/Hidroelétrica de Paolo Afonso', alt: 'Usina hidrelétrica do complexo de Paulo Afonso', text: 'O complexo hidrelétrico de Paulo Afonso reúne usinas no rio São Francisco. A força da água é convertida em energia elétrica por turbinas e geradores.', detail: 'É uma referência de geração na Bahia e uma origem possível para ilustrar a jornada.' },
      { place: 'Paulo Afonso', kind: 'Município · Bahia', label: 'BAHIA · PAULO AFONSO', image: 'src/rota_2/Paulo afonso.jpg', alt: 'Vista de Paulo Afonso', text: 'O município abriga o complexo hidrelétrico da CHESF, no rio São Francisco. A produção é integrada ao sistema elétrico nacional.', detail: 'A imagem mostra o local de geração; o caminho até o Recôncavo não corresponde a um trajeto único.' },
      { place: 'Rede interligada', kind: 'Transmissão · conexão esquemática', label: 'TRANSMISSÃO · SISTEMA INTERLIGADO', image: 'src/rota_2/Rede interligada.jpg', alt: 'Subestação com linhas e estruturas de transmissão elétrica', text: 'Linhas de transmissão transportam energia entre regiões e se conectam a subestações. O Sistema Interligado Nacional coordena a troca de energia entre áreas.', detail: 'A posição da conexão CHESF nesta rota é apenas ilustrativa. O fluxo do sistema varia com a operação e as condições de geração e consumo.' },
      { place: 'Governador Mangabeira', kind: 'Município · rede regional', label: 'RECÔNCAVO · GOVERNADOR MANGABEIRA', image: 'src/rota_2/Governador-Mangabeira.jpg', alt: 'Vista de Governador Mangabeira', text: 'A aproximação ao Recôncavo passa por uma rede regional conectada ao sistema interligado. Os municípios sinalizam o contexto geográfico da apresentação.', detail: 'O mapa não indica a localização nem o percurso de linhas reais neste trecho.' },
      { place: 'Cruz das Almas', kind: 'Distribuição local', label: 'DESTINO · CRUZ DAS ALMAS', image: 'src/rota_2/Cruz_das_Almas,_Bahia.jpg', alt: 'Vista de Cruz das Almas', text: 'Em Cruz das Almas, a distribuidora atende a cidade por redes de distribuição que alcançam o campus universitário.', detail: 'O mapa da rede da Coelba nesta página detalha estruturas próximas à UFRB.' },
      { place: 'UFRB · Campus Cruz das Almas', kind: 'Uso e geração local', label: 'CHEGADA · UFRB', image: 'src/rota_2/UFRb.jpg', alt: 'Campus da UFRB em Cruz das Almas', text: 'No campus, a eletricidade apoia aulas, pesquisas, serviços e atividades cotidianas. A UFRB também conta com geração solar fotovoltaica integrada.', detail: 'A rede interligada combina diferentes fontes; esta rota é uma possibilidade didática, não uma rastreabilidade do consumo.' }
    ] },
    yellow: { name: 'ROTA AMARELA', places: [
      { place: 'Complexos eólicos da Bahia', kind: 'Geração eólica', label: 'GERAÇÃO · ENERGIA EÓLICA', image: 'src/rota_3/Complexo Eólico Alto Sertão II.jpeg', alt: 'Aerogeradores do Complexo Eólico Alto Sertão II', text: 'Aerogeradores transformam a energia dos ventos em eletricidade. A Bahia tem parques eólicos em diferentes regiões do interior.', detail: 'A foto é do Complexo Eólico Alto Sertão II e representa a fonte eólica; não identifica uma usina que abastece diretamente o campus.' },
      { place: 'Subestação Sapeaçu', kind: 'Subestação · referência regional', label: 'REDE · SAPEAÇU', image: 'src/rota_3/Subestações Sapeaçu.jpg', alt: 'Equipamentos de uma subestação elétrica', text: 'Subestações conectam trechos da rede e podem transformar níveis de tensão. Sapeaçu aparece aqui como referência regional da infraestrutura elétrica.', detail: 'A conexão entre geração eólica e Sapeaçu está desenhada de forma esquemática, sem afirmar o fluxo real da energia.' },
      { place: 'Cruz das Almas', kind: 'Distribuição local', label: 'DESTINO · CRUZ DAS ALMAS', image: 'src/rota_3/Cruz-das-Almas-BA-1200x768.jpg', alt: 'Vista aérea de Cruz das Almas', text: 'Em Cruz das Almas, a distribuidora conduz energia pelas redes locais até os diferentes pontos de consumo.', detail: 'O mapa da rede da Coelba nesta página apresenta estruturas locais segundo dados da ANEEL.' },
      { place: 'UFRB · Campus Cruz das Almas', kind: 'Uso e geração local', label: 'CHEGADA · UFRB', image: 'src/rota_3/images.jpeg', alt: 'Entrada do campus da UFRB em Cruz das Almas', text: 'No campus, a eletricidade apoia aulas, pesquisas, serviços e atividades cotidianas. A UFRB também conta com geração solar fotovoltaica integrada.', detail: 'A origem da eletricidade consumida não pode ser rastreada por esta apresentação: o SIN integra diversas fontes.' }
    ] }
  };
  const buttons = [...document.querySelectorAll('[data-presentation-route]')];
  const image = document.querySelector('#presentationImage');
  let routeId = 'blue'; let index = 0;
  const fields = { route: document.querySelector('#presentationRouteName'), count: document.querySelector('#presentationCount'), kind: document.querySelector('#presentationKind'), place: document.querySelector('#presentationPlace'), text: document.querySelector('#presentationText'), detail: document.querySelector('#presentationDetail'), label: document.querySelector('#presentationPhotoLabel'), prev: document.querySelector('#presentationPrev'), next: document.querySelector('#presentationNext') };
  function render() {
    const route = routes[routeId]; const stop = route.places[index];
    fields.route.textContent = route.name;
    fields.count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(route.places.length).padStart(2, '0')}`;
    fields.kind.textContent = stop.kind.toLocaleUpperCase('pt-BR'); fields.place.textContent = stop.place;
    fields.text.textContent = stop.text; fields.detail.textContent = stop.detail; fields.label.textContent = stop.label;
    if (stop.image) { image.src = stop.image; image.alt = stop.alt; image.hidden = false; }
    else { image.hidden = true; image.alt = ''; }
    fields.prev.disabled = index === 0;
    fields.next.innerHTML = index === route.places.length - 1 ? 'Recomeçar <span>↻</span>' : 'Próximo lugar <span>→</span>';
  }
  buttons.forEach((button) => button.addEventListener('click', () => {
    routeId = button.dataset.presentationRoute; index = 0;
    buttons.forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
    render();
  }));
  fields.prev.addEventListener('click', () => { index = Math.max(0, index - 1); render(); });
  fields.next.addEventListener('click', () => { index = (index + 1) % routes[routeId].places.length; render(); });
  render();
})();
