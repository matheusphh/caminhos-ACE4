(() => {
  const routes = {
    blue: { name: 'ROTA AZUL', places: [
      { place: 'Pedra do Cavalo', kind: 'Usina hidrelétrica', label: 'GERAÇÃO · PEDRA DO CAVALO', image: 'src/rota_1/Pedra_do_cavalo.jpeg', alt: 'Barragem de Pedra do Cavalo', text: 'No rio Paraguaçu, a água movimenta turbinas ligadas a geradores. Pedra do Cavalo é uma origem possível para esta narrativa: a eletricidade gerada se integra ao sistema elétrico, que reúne produção de várias usinas.', detail: 'O Plano de Recursos Hídricos da bacia descreve duas turbinas de 82,65 MW cada (165,3 MW no total). O reservatório também tem funções ligadas ao abastecimento de água e ao controle de cheias.' },
      { place: 'Cachoeira', kind: 'Município · conexão esquemática', label: 'RECÔNCAVO · CACHOEIRA', image: 'src/rota_1/cidade-cachoeira2.webp', alt: 'Vista aérea do centro histórico de Cachoeira', text: 'Cachoeira e São Félix ficam a jusante da barragem, a cerca de quatro quilômetros. A proximidade ajuda a entender por que a gestão do reservatório faz parte da história local.', detail: 'Além da geração, o reservatório foi concebido para contribuir com o abastecimento de água e reduzir o impacto de cheias nessas cidades. A ligação desenhada aqui não é um traçado de rede elétrica.' },
      { place: 'Governador Mangabeira', kind: 'Município · rede regional', label: 'RECÔNCAVO · GOVERNADOR MANGABEIRA', image: 'src/rota_1/Governador mangabeira.jpeg', alt: 'Vista de Governador Mangabeira', text: 'A usina e o reservatório estão em uma região que envolve municípios do Recôncavo. Esta parada situa a história da geração no território, antes de seguirmos para Cruz das Almas.', detail: 'A rede nacional é interligada e não conduz eletricidade por uma sequência fixa de municípios. A linha do mapa é apenas uma aproximação visual.' },
      { place: 'Cruz das Almas', kind: 'Distribuição local', label: 'DESTINO · CRUZ DAS ALMAS', image: 'src/rota_1/Cruz das almas.jpg', alt: 'Vista de Cruz das Almas', text: 'A etapa final da rede é a distribuição: concessionárias levam energia até cidades, bairros e unidades consumidoras. A tensão é ajustada para atender diferentes tipos de uso.', detail: 'A ANEEL classifica as redes de distribuição em alta, média e baixa tensão. Os circuitos que chegam a cada endereço dependem da infraestrutura local.' },
      { place: 'UFRB · Campus Cruz das Almas', kind: 'Uso e geração local', label: 'CHEGADA · UFRB', image: 'src/rota_1/UFRB.jpeg', alt: 'Campus da UFRB em Cruz das Almas', text: 'No campus, a energia sustenta aulas, laboratórios, serviços e atividades cotidianas. A universidade também tem geração solar própria, que complementa a energia recebida pela rede.', detail: 'Em comunicado sobre a ativação da usina, em abril de 2025, a UFRB estimou que ela poderia corresponder a 38% do consumo energético do Campus Cruz das Almas. Esse dado é da instituição e pode variar com a operação e o consumo.' }
    ] },
    green: { name: 'ROTA VERDE', places: [
      { place: 'Complexo Paulo Afonso', kind: 'Geração hidrelétrica', label: 'GERAÇÃO · PAULO AFONSO', image: 'src/rota_2/Hidroelétrica de Paolo Afonso', alt: 'Usina hidrelétrica do complexo de Paulo Afonso', text: 'No rio São Francisco, um conjunto de usinas aproveita diferentes desníveis e reservatórios para gerar eletricidade. A água turbinada segue pelo cânion e participa de uma sequência de aproveitamentos hidrelétricos.', detail: 'A usina Paulo Afonso IV, integrante do complexo, tem seis unidades geradoras e 2.462,4 MW de capacidade instalada, segundo a Eletrobras. Esse número se refere a PA IV, não à energia enviada especificamente à UFRB.' },
      { place: 'Paulo Afonso', kind: 'Município · Bahia', label: 'BAHIA · PAULO AFONSO', image: 'src/rota_2/Paulo afonso.jpg', alt: 'Vista de Paulo Afonso', text: 'A cidade se desenvolveu ao lado de uma infraestrutura energética importante para o Nordeste. As usinas e as instalações de transmissão conectam a geração à rede elétrica de maior alcance.', detail: 'A Eletrobras descreve Paulo Afonso IV como instalada no município e ligada ao sistema de reservatórios do São Francisco. O percurso até o Recôncavo não é uma linha única entre os pontos deste mapa.' },
      { place: 'Rede interligada', kind: 'Transmissão · conexão esquemática', label: 'TRANSMISSÃO · SISTEMA INTERLIGADO', image: 'src/rota_2/Rede interligada.jpg', alt: 'Subestação com linhas e estruturas de transmissão elétrica', text: 'O Sistema Interligado Nacional conecta usinas e centros de consumo em quatro subsistemas. Linhas de transmissão permitem transferências entre regiões e ajudam a aproveitar diferenças de geração e condições hidrológicas.', detail: 'O ONS coordena a operação do sistema. O fluxo muda conforme a demanda, as condições dos reservatórios, o vento e a disponibilidade das usinas; não se rastreia uma usina específica até uma tomada.' },
      { place: 'Governador Mangabeira', kind: 'Município · rede regional', label: 'RECÔNCAVO · GOVERNADOR MANGABEIRA', image: 'src/rota_2/Governador-Mangabeira.jpg', alt: 'Vista de Governador Mangabeira', text: 'A aproximação ao Recôncavo passa por uma rede regional conectada ao sistema interligado. A fotografia situa um dos municípios da região entre o sertão de Paulo Afonso e o campus.', detail: 'A rede nacional não conduz eletricidade por uma sequência fixa de municípios. Este ponto ajuda a localizar a narrativa, mas não confirma a passagem de uma linha por aqui.' },
      { place: 'Cruz das Almas', kind: 'Distribuição local', label: 'DESTINO · CRUZ DAS ALMAS', image: 'src/rota_2/Cruz_das_Almas,_Bahia.jpg', alt: 'Vista de Cruz das Almas', text: 'Em Cruz das Almas, a distribuidora local entrega energia aos diferentes consumidores por redes urbanas. A rede de distribuição é a etapa que conecta as instalações da cidade aos pontos de uso.', detail: 'A ANEEL descreve redes de alta, média e baixa tensão. A tensão é rebaixada ao longo do sistema para chegar a equipamentos e instalações com necessidades diferentes.' },
      { place: 'UFRB · Campus Cruz das Almas', kind: 'Uso e geração local', label: 'CHEGADA · UFRB', image: 'src/rota_2/UFRb.jpg', alt: 'Campus da UFRB em Cruz das Almas', text: 'A jornada termina em salas de aula, laboratórios, bibliotecas e serviços. A energia permite iluminação, comunicação, climatização e o funcionamento de equipamentos de pesquisa.', detail: 'O campus também tem uma usina fotovoltaica. A UFRB informou que a ativação da usina poderia corresponder a 38% do consumo energético do campus, mostrando como geração local e rede podem atuar juntas.' }
    ] },
    yellow: { name: 'ROTA AMARELA', places: [
      { place: 'Complexos eólicos da Bahia', kind: 'Geração eólica', label: 'GERAÇÃO · ENERGIA EÓLICA', image: 'src/rota_3/Complexo Eólico Alto Sertão II.jpeg', alt: 'Aerogeradores do Complexo Eólico Alto Sertão II', text: 'O vento gira as pás do aerogerador, que acionam um gerador elétrico. A Bahia integra uma das regiões eólicas acompanhadas pela EPE, que publica indicadores de disponibilidade do vento e de potencial de produção.', detail: 'A foto é do Complexo Eólico Alto Sertão II e ilustra a tecnologia. A rota não afirma que esse parque abasteça diretamente a UFRB.' },
      { place: 'Subestação Sapeaçu', kind: 'Subestação · referência regional', label: 'REDE · SAPEAÇU', image: 'src/rota_3/Subestações Sapeaçu.jpg', alt: 'Equipamentos de uma subestação elétrica', text: 'Subestações reúnem equipamentos de proteção, medição, manobra e transformação. Elas conectam partes do sistema elétrico e ajudam a adequar a tensão entre etapas da rede.', detail: 'A ANEEL descreve a distribuição como o segmento que leva energia ao consumidor final após o rebaixamento da tensão. Sapeaçu é uma referência regional desta rota esquemática, não a comprovação de um trajeto real.' },
      { place: 'Cruz das Almas', kind: 'Distribuição local', label: 'DESTINO · CRUZ DAS ALMAS', image: 'src/rota_3/Cruz-das-Almas-BA-1200x768.jpg', alt: 'Vista aérea de Cruz das Almas', text: 'A eletricidade chega à cidade por redes de distribuição que atendem casas, comércios, serviços públicos e o campus universitário. Subestações e transformadores adequam a tensão entre os trechos da rede.', detail: 'A ANEEL define a distribuição como o segmento que leva energia ao consumidor final. O mapa da rede próximo à UFRB mostra estruturas locais, mas não rastreia a usina que gerou cada unidade de energia.' },
      { place: 'UFRB · Campus Cruz das Almas', kind: 'Uso e geração local', label: 'CHEGADA · UFRB', image: 'src/rota_3/images.jpeg', alt: 'Entrada do campus da UFRB em Cruz das Almas', text: 'No campus, energia da rede e geração fotovoltaica local apoiam aulas, pesquisas e a vida cotidiana. A usina solar também abre espaço para atividades de ensino e pesquisa sobre fontes renováveis.', detail: 'A UFRB informou que a usina fotovoltaica instalada no campus poderia corresponder a 38% do consumo energético após sua ativação em 2025. O restante segue integrado à rede elétrica.' }
    ] }
  };
  const sources = {
    'Pedra do Cavalo': ['Plano da Bacia do Paraguaçu · INEMA', 'https://www.ba.gov.br/inema/sites/site-inema/files/2025-09/NT5%20%E2%80%93%20DISPONIBILIDADE%20H%C3%8DDRICA%20SUPERFICIAL_PARAGUA%C3%87U.pdf'],
    Cachoeira: ['Plano da Bacia do Paraguaçu · INEMA', 'https://www.ba.gov.br/inema/sites/site-inema/files/2025-09/NT5%20%E2%80%93%20DISPONIBILIDADE%20H%C3%8DDRICA%20SUPERFICIAL_PARAGUA%C3%87U.pdf'],
    'Governador Mangabeira': ['Plano da Bacia do Paraguaçu · INEMA', 'https://www.ba.gov.br/inema/sites/site-inema/files/2025-09/NT5%20%E2%80%93%20DISPONIBILIDADE%20H%C3%8DDRICA%20SUPERFICIAL_PARAGUA%C3%87U.pdf'],
    'Cruz das Almas': ['Distribuição de energia · ANEEL', 'https://www.gov.br/aneel/pt-br/assuntos/distribuicao/regulacao'],
    'UFRB · Campus Cruz das Almas': ['Usina fotovoltaica da UFRB · comunicado de 2025', 'https://ufrb.edu.br/portal1/noticias/7579-nota-da-ufrb-sobre-o-desligamento-programado-de-energia-no-campus-cruz-das-almas-na-sexta-feira-4'],
    'Complexo Paulo Afonso': ['Usinas do Complexo de Paulo Afonso · Eletrobras', 'https://www.eletrobras.com/pt/Paginas/Usinas.aspx'],
    'Paulo Afonso': ['Usinas do Complexo de Paulo Afonso · Eletrobras', 'https://www.eletrobras.com/pt/Paginas/Usinas.aspx'],
    'Rede interligada': ['O que é o Sistema Interligado Nacional · ONS', 'https://www.ons.org.br/paginas/sobre-o-sin/o-que-e-o-sin'],
    'Complexos eólicos da Bahia': ['Boletim de Energia Eólica · EPE', 'https://www.epe.gov.br/pt/imprensa/noticias/epe-publica-boletim-trimestral-de-energia-eolica'],
    'Subestação Sapeaçu': ['Regulação da distribuição · ANEEL', 'https://www.gov.br/aneel/pt-br/assuntos/distribuicao/regulacao']
  };
  const generationHistory = {
    blue: {
      text: 'A barragem começou a operar em 1985, inicialmente para usos como abastecimento de água e controle de cheias no baixo Paraguaçu. A geração hidrelétrica começou em 2005, acrescentando uma nova função à infraestrutura já existente.',
      source: ['Plano da Bacia do Paraguaçu · INEMA', 'https://www.ba.gov.br/inema/sites/site-inema/files/2025-09/NT5%20%E2%80%93%20DISPONIBILIDADE%20H%C3%8DDRICA%20SUPERFICIAL_PARAGUA%C3%87U.pdf']
    },
    green: {
      text: 'A CHESF foi criada em 1945 e iniciou suas operações em 1948. Paulo Afonso I, concluída em 1955, marcou o começo do complexo que cresceu em etapas para ampliar a oferta de energia no Nordeste.',
      source: ['Histórico institucional da CHESF · Formulário de Referência 2025', 'https://www.chesf.com.br/relainvest/Documents/Pages/CVM/FR/FRe%20Chesf%20v3%20%281%29.pdf']
    },
    yellow: {
      text: 'Alto Sertão II surgiu de projetos contratados nos leilões de energia de reserva de 2010 e de energia nova de 2011. O complexo reúne 15 parques e 230 aerogeradores; sua implantação integra a expansão da geração eólica no interior baiano.',
      source: ['Complexo Alto Sertão II · Secretaria de Desenvolvimento Econômico da Bahia', 'https://www.ba.gov.br/sde/2020/08/19/nordeste-da-bahia-tera-complexo-eolico-com-r-13-bilhao-em-investimentos']
    }
  };
  const buttons = [...document.querySelectorAll('[data-presentation-route]')];
  const presentation = document.querySelector('.presentation-slide');
  const fullscreenButton = document.querySelector('#presentationFullscreen');
  const slide = document.querySelector('.presentation-slide');
  const image = document.querySelector('#presentationImage');
  let routeId = 'blue'; let index = 0;
  const fields = { route: document.querySelector('#presentationRouteName'), count: document.querySelector('#presentationCount'), kind: document.querySelector('#presentationKind'), place: document.querySelector('#presentationPlace'), text: document.querySelector('#presentationText'), detail: document.querySelector('#presentationDetail'), source: document.querySelector('#presentationSource'), history: document.querySelector('#presentationHistory'), historyText: document.querySelector('#presentationHistoryText'), historySource: document.querySelector('#presentationHistorySource'), label: document.querySelector('#presentationPhotoLabel'), prev: document.querySelector('#presentationPrev'), next: document.querySelector('#presentationNext') };
  function render() {
    const route = routes[routeId]; const stop = route.places[index];
    fields.route.textContent = route.name;
    fields.count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(route.places.length).padStart(2, '0')}`;
    fields.kind.textContent = stop.kind.toLocaleUpperCase('pt-BR'); fields.place.textContent = stop.place;
    fields.text.textContent = stop.text; fields.detail.textContent = stop.detail; fields.label.textContent = stop.label;
    const [sourceTitle, sourceUrl] = sources[stop.place] || sources['Rede interligada'];
    fields.source.href = sourceUrl; fields.source.textContent = `Fonte: ${sourceTitle} ↗`;
    const history = index === 0 ? generationHistory[routeId] : null;
    fields.history.hidden = !history;
    if (history) {
      fields.historyText.textContent = history.text;
      fields.historySource.href = history.source[1];
      fields.historySource.textContent = `História: ${history.source[0]} ↗`;
    }
    if (stop.image) { image.src = stop.image; image.alt = stop.alt; image.hidden = false; }
    else { image.hidden = true; image.alt = ''; }
    fields.prev.disabled = index === 0;
    fields.next.innerHTML = index === route.places.length - 1 ? 'Recomeçar <span>↻</span>' : 'Próximo lugar <span>→</span>';
    slide.classList.remove('is-entering');
    window.requestAnimationFrame(() => slide.classList.add('is-entering'));
  }
  function syncFullscreenButton() {
    const active = document.fullscreenElement === presentation || presentation.classList.contains('is-fullscreen-fallback');
    fullscreenButton.setAttribute('aria-pressed', String(active));
    fullscreenButton.innerHTML = active ? '⛶ <span>Sair da tela cheia</span>' : '⛶ <span>Ver slide em tela cheia</span>';
  }
  fullscreenButton.addEventListener('click', async () => {
    if (document.fullscreenElement === presentation || presentation.classList.contains('is-fullscreen-fallback')) {
      if (document.fullscreenElement === presentation && document.exitFullscreen) await document.exitFullscreen();
      else presentation.classList.remove('is-fullscreen-fallback');
      syncFullscreenButton();
      fullscreenButton.focus();
      return;
    }
    if (!presentation.requestFullscreen) {
      presentation.classList.add('is-fullscreen-fallback');
      syncFullscreenButton();
      return;
    }
    try { await presentation.requestFullscreen(); }
    catch { presentation.classList.add('is-fullscreen-fallback'); }
    syncFullscreenButton();
  });
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) presentation.classList.remove('is-fullscreen-fallback');
    syncFullscreenButton();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && presentation.classList.contains('is-fullscreen-fallback')) {
      presentation.classList.remove('is-fullscreen-fallback');
      syncFullscreenButton();
      fullscreenButton.focus();
    }
  });
  buttons.forEach((button) => button.addEventListener('click', () => {
    routeId = button.dataset.presentationRoute; index = 0;
    buttons.forEach((choice) => choice.setAttribute('aria-pressed', String(choice === button)));
    render();
  }));
  fields.prev.addEventListener('click', () => { index = Math.max(0, index - 1); render(); });
  fields.next.addEventListener('click', () => { index = (index + 1) % routes[routeId].places.length; render(); });
  render();
})();
