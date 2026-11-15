# Energia em Percurso — UFRB

Site interativo de um projeto de extensão que apresenta a jornada da energia elétrica, da produção ao consumo nos espaços da Universidade Federal do Recôncavo da Bahia. O conteúdo foi pensado para a comunidade acadêmica e para a comunidade externa.

## Como abrir

O site é estático e não precisa de instalação ou dependências. Abra `index.html` em um navegador. Para servir os arquivos localmente durante a edição, também é possível executar `python3 -m http.server 8000` na pasta do projeto e acessar `http://localhost:8000`.

## Estrutura do repositório

- `index.html` — estrutura da página, conteúdo textual, navegação e ilustração SVG.
- `styles.css` — identidade visual, animações e layouts responsivos para computador, tablet e smartphone.
- `script.js` — navegação interativa pelas seis etapas da jornada.
- `AGENT.MD` — orientações para contribuições e manutenção da documentação.

## Conteúdo da jornada

A seção “Siga o fio” acompanha seis etapas: produção, elevação da tensão, transmissão, distribuição, uso consciente e chegada à UFRB. A página também apresenta exemplos do papel da energia em pesquisa, aprendizagem e atividades cotidianas no campus.

### Como editar os textos

Os textos da página são marcados em HTML no `index.html`. O primeiro passo da jornada está no próprio cartão `.story-card`; os passos seguintes estão na seção `.story-source`, identificados por `data-story-step`. Cada etapa usa os atributos `data-category`, `data-index`, `data-title`, `data-text`, `data-fact`, `data-tag` e `data-symbol`. Ao editar esses conteúdos, mantenha esses atributos para que a navegação interativa continue funcionando.

Os rótulos dos pontos da jornada também estão no HTML, dentro de `.route-list`. Os demais textos podem ser localizados diretamente pelas seções e títulos da página. O `script.js` cuida da interação e não deve ser usado como local principal para editar o conteúdo editorial.

## Interações e acessibilidade

- Selecione um ponto da lista, use os botões de anterior/próximo ou as setas do teclado para percorrer a história.
- Em telas sensíveis ao toque, deslize sobre o cartão da etapa para avançar ou voltar.
- O layout se ajusta a telas menores; as animações respeitam a preferência do sistema por movimento reduzido.
- A página inclui estrutura semântica, rótulos de navegação e um link para pular diretamente ao conteúdo.

## Documentação das mudanças

Toda alteração no código deve ser registrada neste README na mesma contribuição. Atualize a seção afetada e acrescente uma entrada em **Histórico de alterações**, descrevendo o que mudou e quais arquivos foram afetados. Consulte `AGENT.MD` para as orientações completas.

## Histórico de alterações

- **2026-11-15** — Criação do site interativo, da narrativa da jornada elétrica, da ilustração animada, dos controles de navegação e dos estilos responsivos para smartphone. Arquivos: `index.html`, `styles.css`, `script.js`.
- **2026-11-15** — Documentação inicial do repositório e regra para registrar futuras mudanças de código neste README. Arquivos: `README.md`, `AGENT.MD`.
