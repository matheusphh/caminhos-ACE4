const topics = [
  {
    category: 'A JORNADA COMEÇA · PRODUÇÃO', title: 'Energia de muitas fontes.',
    lede: 'A eletricidade que chega a Cruz das Almas faz parte de um sistema conectado, alimentado por usinas de diferentes regiões e fontes.',
    sections: [
      ['Uma rede de muitas origens', 'No Brasil, usinas hidrelétricas, parques eólicos, centrais solares e outras fontes injetam energia no Sistema Interligado Nacional (SIN). Como a rede é interligada, a eletricidade consumida em uma cidade não precisa vir de uma usina específica ou próxima. A composição da geração varia conforme a disponibilidade das fontes e as condições de operação do sistema.'],
      ['A contribuição baiana', 'Na Bahia, a geração inclui grandes hidrelétricas no rio São Francisco, como as dos complexos de Paulo Afonso e Sobradinho, além de parques eólicos e solares distribuídos pelo interior, especialmente no Sertão, no Oeste e no Norte do estado. Essas usinas contribuem para a energia que circula pelo sistema.']
    ], fact: 'A energia que chega a uma tomada é fornecida por uma rede interligada; não é possível identificar uma única usina como sua origem física.'
  },
  {
    category: 'ETAPA 02 · ELEVAÇÃO DE TENSÃO', title: 'A tensão ganha força.',
    lede: 'Antes de percorrer longas distâncias, a energia passa por equipamentos que preparam a eletricidade para a transmissão.',
    sections: [
      ['Transformadores elevadores', 'Nas usinas ou em subestações próximas, transformadores elevadores aumentam a tensão elétrica. Em sistemas de transmissão, são comuns níveis como 230 kV e 500 kV, e há instalações que operam acima disso. A tensão escolhida depende do projeto e do trecho da rede.'],
      ['Menos perdas no caminho', 'Para a mesma potência transmitida, elevar a tensão reduz a corrente elétrica. Como o aquecimento dos condutores depende da corrente, essa medida ajuda a diminuir as perdas por efeito Joule ao longo das linhas. A energia segue em corrente alternada ou, em alguns enlaces, em corrente contínua.']
    ], fact: 'A elevação da tensão torna mais eficiente o transporte de grandes quantidades de energia por longas distâncias.'
  },
  {
    category: 'ETAPA 03 · TRANSMISSÃO', title: 'Pelos caminhos da rede.',
    lede: 'Linhas de alta tensão conectam regiões e aproximam a energia gerada dos centros de consumo.',
    sections: [
      ['Uma rede interligada', 'Torres, cabos e subestações formam corredores de transmissão que atravessam grandes distâncias. Subestações fazem conexões entre linhas e permitem controlar o fluxo de energia. No Brasil, diferentes instalações compõem o SIN e conectam áreas de geração e consumo.'],
      ['Do sistema às redes regionais', 'A energia percorre a rede de transmissão até subestações que atendem áreas regionais. A operação coordenada permite que a eletricidade venha de diferentes regiões conforme as condições do sistema. Empresas transmissoras são responsáveis por instalações e linhas específicas, sob regras do setor elétrico.']
    ], fact: 'As linhas de transmissão formam uma malha conectada; a eletricidade pode circular por diferentes caminhos até as redes locais.'
  },
  {
    category: 'ETAPA 04 · DISTRIBUIÇÃO', title: 'A energia chega à cidade.',
    lede: 'A rede de distribuição transforma a energia recebida das linhas de transmissão em eletricidade pronta para chegar aos consumidores.',
    sections: [
      ['Subestações e média tensão', 'A partir de uma subestação regional, a energia passa para circuitos de distribuição. Em Cruz das Almas, redes de média tensão — frequentemente em torno de 13,8 kV — percorrem vias públicas e alimentam transformadores instalados nos postes ou em estruturas próprias.'],
      ['Até casas e instituições', 'Os transformadores reduzem a tensão para níveis adequados ao uso em residências, comércios e instituições. A Neoenergia Coelba opera a distribuição local na Bahia. Os circuitos urbanos conduzem a energia pela cidade, incluindo o atendimento ao campus da UFRB.']
    ], fact: 'A rede de distribuição local é a etapa que conecta as subestações regionais às ruas e aos pontos de consumo.'
  },
  {
    category: 'ETAPA 05 · USO CONSCIENTE', title: 'Cada escolha também conta.',
    lede: 'Depois que a energia chega aos espaços de convivência, nossas escolhas influenciam quanto usamos e como cuidamos dos recursos.',
    sections: [
      ['Perceber o consumo', 'Iluminação, climatização, computadores e equipamentos fazem parte da rotina. Observar quando e por quanto tempo são usados ajuda a identificar oportunidades para evitar desperdícios sem comprometer conforto, segurança ou as atividades de estudo e trabalho.'],
      ['Cuidado coletivo', 'Apagar luzes em espaços vazios, aproveitar a iluminação natural e desligar equipamentos quando apropriado são atitudes simples. Em ambientes universitários, conversar sobre hábitos e necessidades ajuda a construir soluções adequadas para cada espaço.']
    ], fact: 'Eficiência energética combina bons hábitos com equipamentos e ambientes planejados para entregar o serviço necessário usando menos energia.'
  },
  {
    category: 'ETAPA 06 · UFRB', title: 'Na UFRB, a energia também nasce aqui.',
    lede: 'No campus de Cruz das Almas, a energia da rede se soma à geração solar fotovoltaica instalada na própria universidade.',
    sections: [
      ['A rede atende o campus', 'Circuitos urbanos levam energia pelas ruas da cidade até a UFRB. Dentro do campus, a eletricidade dá suporte a salas de aula, laboratórios, bibliotecas, serviços e espaços de convivência. A infraestrutura local distribui essa energia aos diferentes edifícios e equipamentos.'],
      ['Geração solar no local', 'A usina solar fotovoltaica integrada ao campus converte a luz do sol em eletricidade. Essa produção local complementa o fornecimento da rede e pode reduzir a quantidade de energia que precisa ser recebida em determinados momentos. A geração varia ao longo do dia e depende das condições climáticas.']
    ], fact: 'A energia usada no campus pode combinar eletricidade recebida da rede com a geração fotovoltaica local.'
  }
];

const params = new URLSearchParams(window.location.search);
const requested = Number.parseInt(params.get('etapa') ?? '0', 10);
const current = Number.isInteger(requested) && requested >= 0 && requested < topics.length ? requested : 0;
const topic = topics[current];
document.title = `${topic.title.replace('.', '')} — Energia em percurso`;
document.querySelector('#detail-category').textContent = topic.category;
document.querySelector('#detail-index').textContent = `ETAPA ${String(current + 1).padStart(2, '0')} / 06`;
document.querySelector('#detail-title').textContent = topic.title;
document.querySelector('#detail-lede').textContent = topic.lede;
document.querySelector('#detail-fact').textContent = topic.fact;
const sections = document.querySelector('#detail-sections');
topic.sections.forEach(([heading, body]) => {
  const section = document.createElement('section');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  h2.textContent = heading;
  p.textContent = body;
  section.append(h2, p);
  sections.append(section);
});
const prev = document.querySelector('#detail-prev');
const next = document.querySelector('#detail-next');
prev.href = `detalhe.html?etapa=${(current + topics.length - 1) % topics.length}`;
next.href = `detalhe.html?etapa=${(current + 1) % topics.length}`;
if (current === 0) prev.textContent = '← Etapa anterior · UFRB';
if (current === topics.length - 1) next.textContent = 'Próxima etapa · Produção →';
