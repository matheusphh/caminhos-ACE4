# Orientações para agentes e colaboradores

Este arquivo orienta quem fizer manutenção neste repositório. A documentação principal do projeto e o histórico de mudanças ficam em `README.md`.

## Regra de documentação

Sempre que alterar, adicionar ou remover código, atualize `README.md` na mesma contribuição. Registre a mudança em **Histórico de alterações**, com a data, um resumo objetivo e os arquivos afetados. Ajuste também as seções de estrutura, conteúdo ou funcionamento quando a mudança tornar essas informações desatualizadas. Não encerre uma alteração de código deixando a documentação para depois.

## Como trabalhar neste projeto

- Preserve o formato de site estático: HTML, CSS e JavaScript, sem adicionar ferramentas ou dependências sem necessidade.
- Mantenha os textos editoriais em HTML no `index.html`, para que participantes sem experiência em JavaScript possam revisá-los.
- Ao editar as etapas da jornada, preserve no `.story-source` os atributos `data-story-step`, `data-category`, `data-index`, `data-title`, `data-text`, `data-fact`, `data-tag` e `data-symbol`. Eles conectam o conteúdo à interação em `script.js`.
- Preserve os identificadores, classes e atributos usados pelos estilos, scripts, links internos e recursos de acessibilidade. Se precisar renomeá-los, atualize todas as referências no mesmo trabalho.
- Considere telas pequenas e navegação por teclado/toque ao alterar layout ou interações. Respeite `prefers-reduced-motion` ao criar animações.
- Escreva a interface em português brasileiro e mantenha a linguagem acessível às comunidades acadêmica e externa.
- Não inclua dados específicos sobre consumo, instalações ou fornecimento de energia da UFRB sem uma fonte confirmada. O conteúdo atual é introdutório e geral.

## Arquivos principais

- `index.html` — conteúdo, estrutura semântica e ilustração.
- `styles.css` — identidade visual, responsividade e animações.
- `script.js` — controles da narrativa interativa.
- `README.md` — documentação pública do repositório e histórico de mudanças; mantenha-o atualizado com cada alteração de código.
