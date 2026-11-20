[Site](https://matheusphh.github.io/caminhos-ACE4/)
# Energia em Percurso — UFRB

Site interativo de um projeto de extensão que apresenta a jornada da energia elétrica, da produção ao consumo nos espaços da Universidade Federal do Recôncavo da Bahia. O conteúdo foi pensado para a comunidade acadêmica e para a comunidade externa.

## Como abrir

O conteúdo editorial pode ser aberto diretamente em `index.html`. Para usar o mapa, é necessário iniciar também a API local e servir a página por HTTP; siga as instruções da seção abaixo. O restante do site continua disponível sem o serviço BDGD.

## Mapa da rede elétrica próxima à UFRB

A seção “A rede perto da UFRB” consulta uma API própria alimentada pela BDGD da Neoenergia Coelba, em um banco PostgreSQL/PostGIS. O mapa mostra os segmentos de média tensão (`SSDMT`), os segmentos de baixa tensão (`SSDBT`), as unidades transformadoras de distribuição (`UNTRD`) e as áreas de subestação (`SUB`) no entorno do campus de Cruz das Almas. A camada de baixa tensão é opcional e começa desativada para reduzir a densidade visual. O processo de importação recorta essas camadas para a região do campus e não importa camadas de unidades consumidoras.

A seção “Rotas da energia” apresenta três mapas interativos: Rota Azul (Pedra do Cavalo–UFRB), Rota Verde (Paulo Afonso–UFRB) e Rota Amarela (complexos eólicos–Sapeaçu–UFRB). Os mapas permitem arrastar, aproximar e abrir os pontos. As linhas são esquemáticas e não afirmam o traçado das linhas de transmissão ou o caminho físico da energia no SIN; a localização indicada para a Rede CHESF e para os complexos eólicos é ilustrativa.

Na mesma seção, a apresentação interativa permite escolher uma das três origens e avançar por lugares e estruturas até a UFRB. Ela mostra fotografias dos pontos de geração, das cidades, de uma subestação e do campus, com informações ampliadas e uma fonte de referência em cada parada. Os slides de geração incluem um bloco “Contexto e história”: a cronologia de Pedra do Cavalo tem como referência o [INEMA](https://www.ba.gov.br/inema/sites/site-inema/files/2025-09/NT5%20%E2%80%93%20DISPONIBILIDADE%20H%C3%8DDRICA%20SUPERFICIAL_PARAGUA%C3%87U.pdf), a de Paulo Afonso o [histórico institucional da CHESF](https://www.chesf.com.br/relainvest/Documents/Pages/CVM/FR/FRe%20Chesf%20v3%20%281%29.pdf), e a de Alto Sertão II a [Secretaria de Desenvolvimento Econômico da Bahia](https://www.ba.gov.br/sde/2020/08/19/nordeste-da-bahia-tera-complexo-eolico-com-r-13-bilhao-em-investimentos). Os demais conteúdos usam informações do [ONS sobre o SIN](https://www.ons.org.br/paginas/sobre-o-sin/o-que-e-o-sin), da [Eletrobras sobre Paulo Afonso](https://www.eletrobras.com/pt/Paginas/Usinas.aspx), da [ANEEL sobre distribuição](https://www.gov.br/aneel/pt-br/assuntos/distribuicao/regulacao), da [EPE sobre energia eólica](https://www.epe.gov.br/pt/imprensa/noticias/epe-publica-boletim-trimestral-de-energia-eolica) e da [UFRB sobre a usina solar do campus](https://ufrb.edu.br/portal1/noticias/7579-nota-da-ufrb-sobre-o-desligamento-programado-de-energia-no-campus-cruz-das-almas-na-sexta-feira-4). O botão “Ver slide em tela cheia” expande somente a etapa atual, sem colocar a página inteira em tela cheia; Esc permite sair. A entrada de cada etapa é animada. O texto esclarece que as rotas são possibilidades educativas, não rastreamento do fornecimento real ao campus.

O mapa e a API estão preparados no repositório, mas só exibem dados depois de importar a geodatabase e iniciar o serviço. A base cartográfica da distribuidora é disponibilizada pela ANEEL em arquivo `.gdb`; por seu tamanho, ela não é armazenada neste repositório. A API deve ser hospedada em um serviço com Docker e PostGIS. O GitHub Pages serve apenas a página estática, portanto a publicação pública do mapa exige hospedar a API separadamente e definir `window.BDGD_API_URL` antes de `bdgd-map.js` (por exemplo, com `<script>window.BDGD_API_URL = 'https://api.exemplo.br';</script>` no `index.html`) e restringir `CORS_ORIGINS` ao domínio do site.

### Preparar os dados e iniciar localmente

1. Baixe a geodatabase da Neoenergia Coelba na [página oficial da BDGD da ANEEL](https://dadosabertos.aneel.gov.br/dataset/base-de-dados-geografica-da-distribuidora-bdgd) e extraia a pasta `.gdb` em `dados/`. O compose está configurado para a pasta `dados/BDGB.gdb` que está neste workspace. Se o download tiver outro nome, ajuste `BDGD_GDB` no serviço `importer` de `docker-compose.yml` para o caminho correspondente dentro de `/data`.
2. Copie `.env.example` para `.env` e ajuste os valores, especialmente a senha e a data-base correspondente ao arquivo baixado.
3. Execute `docker compose up -d --build db api` para iniciar PostGIS e a API em `http://localhost:8000`.
4. Execute `docker compose --profile import build importer` para atualizar a imagem do importador e, em seguida, `docker compose --profile import run --rm importer` para importar as camadas do recorte ao redor do campus. O importador aceita os formatos de listagem de camadas das versões atuais e antigas do GDAL; quando `UNTRD` não existir, usa `UNTRMT` como origem para os transformadores de média tensão. O script `./run.sh` executa a inicialização, reconstrói o importador, importa os dados e inicia o servidor HTTP nesta ordem.
5. Sirva o site por HTTP local, por exemplo com `python3 -m http.server 8001`, e acesse `http://localhost:8001`. A página consulta a API em `http://localhost:8000`.

O endpoint `GET /api/features?bbox=oeste,sul,leste,norte&layers=SSDMT,SSDBT,UNTRD,SUB` devolve GeoJSON da área visível. A API limita a consulta a um grau por eixo e 5.000 feições por camada. Também disponibiliza `GET /api/health`. Para produção, use HTTPS e credenciais próprias. O valor inicial `http://localhost:8000` é apenas para desenvolvimento local.

## Estrutura do repositório

- `index.html` — estrutura da página, conteúdo textual, navegação e ilustração SVG.
- `styles.css` — identidade visual, animações e layouts responsivos para computador, tablet e smartphone.
- `script.js` — navegação interativa pelas seis etapas da jornada.
- `bdgd-map.js` e `styles-bdgd.css` — mapa Leaflet e controles das camadas BDGD.
- `route-maps.js` e `styles-routes.css` — três mapas interativos esquemáticos das rotas até a UFRB.
- `route-presentation.js` e `styles-presentation.css` — apresentação interativa com escolha de rota, navegação por etapas e fotos locais organizadas em `src/rota_1/`, `src/rota_2/` e `src/rota_3/`.
- `styles-accessibility.css` — ajustes de tamanho de texto, contraste, área de toque e foco visível por teclado.
- `backend/` — API FastAPI, imagem Docker, inicialização PostGIS e importador de camadas.
- `docker-compose.yml` — serviços locais de PostGIS, API e importação.
- `AGENT.MD` — orientações para contribuições e manutenção da documentação.

## Conteúdo da jornada

A seção “Siga o fio” acompanha seis etapas: produção, elevação da tensão, transmissão, distribuição, uso consciente e chegada à UFRB. A página também apresenta exemplos do papel da energia em pesquisa, aprendizagem e atividades cotidianas no campus.

### Como editar os textos

Os textos da página são marcados em HTML no `index.html`. O primeiro passo da jornada está no próprio cartão `.story-card`; os passos seguintes estão na seção `.story-source`, identificados por `data-story-step`. Cada etapa usa os atributos `data-category`, `data-index`, `data-title`, `data-text`, `data-fact`, `data-tag` e `data-symbol`. Ao editar esses conteúdos, mantenha esses atributos para que a navegação interativa continue funcionando.

Os rótulos dos pontos da jornada também estão no HTML, dentro de `.route-list`. Os demais textos podem ser localizados diretamente pelas seções e títulos da página. O `script.js` cuida da interação e não deve ser usado como local principal para editar o conteúdo editorial.

## Interações e acessibilidade

- Selecione um ponto da lista, use os botões de anterior/próximo ou as setas do teclado para percorrer a história.
- Na apresentação das rotas, escolha Pedra do Cavalo, Paulo Afonso ou energia eólica e avance pelas paradas com os botões anterior/próximo.
- O slide atual pode ser expandido em tela cheia; use Esc ou o botão de saída para voltar à apresentação.
- Em telas sensíveis ao toque, deslize sobre o cartão da etapa para avançar ou voltar.
- O layout se ajusta a telas menores; as animações respeitam a preferência do sistema por movimento reduzido.
- Os estilos de acessibilidade ampliam textos auxiliares, preservam alvos de toque confortáveis e destacam o foco de teclado.
- A página inclui estrutura semântica, rótulos de navegação e um link para pular diretamente ao conteúdo.

## Documentação das mudanças

Toda alteração no código deve ser registrada neste README na mesma contribuição. Atualize a seção afetada e acrescente uma entrada em **Histórico de alterações**, descrevendo o que mudou e quais arquivos foram afetados. Consulte `AGENT.MD` para as orientações completas.

## Histórico de alterações

- **2026-11-20** — Inclusão de contexto histórico para Pedra do Cavalo, Complexo de Paulo Afonso e Alto Sertão II, com fontes institucionais por ponto de geração. Arquivos: `index.html`, `route-presentation.js`, `styles-presentation.css`, `styles-accessibility.css`, `README.md`.

- **2026-11-20** — Ampliação do texto dos slides com dados de fontes institucionais e links de referência por parada, mantendo a distinção entre contexto regional e trajeto elétrico comprovado. Arquivos: `route-presentation.js`, `index.html`, `styles-presentation.css`, `styles-accessibility.css`, `README.md`.
- **2026-11-20** — Reposicionamento do botão de tela cheia acima dos controles de navegação no layout mobile. Arquivos: `styles-presentation.css`, `README.md`.

- **2026-11-20** — Inclusão de tela cheia somente para o slide atual e animação de entrada para fotos e conteúdo de cada parada, respeitando movimento reduzido. Arquivos: `index.html`, `route-presentation.js`, `styles-presentation.css`, `README.md`.

- **2026-11-20** — Atualização dos caminhos das fotos para usar a organização por pastas de rota em `src/`. Arquivos: `index.html`, `route-presentation.js`, `README.md`.

- **2026-11-20** — Ampliação de textos pequenos, melhora de contraste em rótulos e inclusão de foco visível e áreas de toque maiores nos controles. Arquivos: `index.html`, `styles-accessibility.css`, `README.md`.

- **2026-11-20** — Inclusão das novas fotos de Cruz das Almas, da subestação de Sapeaçu e da entrada da UFRB na apresentação das rotas. Arquivos: `route-presentation.js`, `README.md`.

- **2026-11-20** — Apresentação interativa das rotas com seleção de origem, navegação por paradas, imagens locais e contexto dos lugares até a UFRB. Arquivos: `index.html`, `route-presentation.js`, `styles-presentation.css`, `README.md`.

- **2026-11-19** — Inclusão de três mapas interativos esquemáticos (Rotas Azul, Verde e Amarela), com pontos clicáveis, linhas coloridas e aviso sobre a natureza ilustrativa dos trajetos. Arquivos: `index.html`, `route-maps.js`, `styles-routes.css`, `README.md`.

- **2026-11-19** — Alinhamento do caminho da geodatabase com o arquivo disponível (`dados/BDGB.gdb`) e correção da chamada do serviço importador no `run.sh`. Arquivos: `docker-compose.yml`, `run.sh`, `README.md`.
- **2026-11-19** — Compatibilidade do importador com formatos de listagem do GDAL e com a camada `UNTRMT` usada em algumas versões da BDGD. Arquivos: `backend/import_bdgd.py`, `README.md`.
- **2026-11-19** — Reconstrução explícita da imagem do importador no script local para aplicar atualizações do código antes da importação. Arquivos: `run.sh`, `README.md`.

- **2026-11-18** — Inclusão do mapa geográfico da rede da Coelba no entorno da UFRB, API FastAPI/PostGIS e rotina de importação recortada das camadas SSDMT, SSDBT, UNTRD e SUB. A integração depende de obter a geodatabase da ANEEL e hospedar a API separadamente do GitHub Pages. Arquivos: `index.html`, `bdgd-map.js`, `styles-bdgd.css`, `backend/`, `docker-compose.yml`, `.env.example`, `.gitignore`, `dados/.gitkeep`, `README.md`.

- **2026-11-15** — Criação do site interativo, da narrativa da jornada elétrica, da ilustração animada, dos controles de navegação e dos estilos responsivos para smartphone. Arquivos: `index.html`, `styles.css`, `script.js`.
- **2026-11-15** — Documentação inicial do repositório e regra para registrar futuras mudanças de código neste README. Arquivos: `README.md`, `AGENT.MD`.
