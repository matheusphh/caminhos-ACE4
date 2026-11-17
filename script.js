// Os textos são editáveis em HTML: atualize o conteúdo em index.html, na seção .story-source.
const steps = [...document.querySelectorAll('[data-story-step]')].map((source) => ({
  category: source.querySelector('[data-category]').textContent,
  index: source.querySelector('[data-index]').textContent,
  title: source.querySelector('[data-title]').innerHTML.replace(/<br\s*\/?\s*>/gi, '\n'),
  text: source.querySelector('[data-text]').textContent,
  fact: source.querySelector('[data-fact]').textContent,
  tag: source.querySelector('[data-tag]').textContent,
  symbol: source.querySelector('[data-symbol]').textContent
}));
steps.unshift({
  category: document.querySelector('.story-category').textContent,
  index: document.querySelector('#stepIndex').textContent,
  title: document.querySelector('#stepTitle').innerHTML.replace(/<br\s*\/?\s*>/gi, '\n'),
  text: document.querySelector('#stepText').textContent,
  fact: document.querySelector('#stepFact').textContent,
  tag: document.querySelector('#stepTag').textContent,
  symbol: document.querySelector('.story-symbol').textContent
});

const stops = [...document.querySelectorAll('.route-stop')];
const card = document.querySelector('.story-card');
let current = 0;
let touchStartX = null;

function showStep(index) {
  current = (index + steps.length) % steps.length;
  const step = steps[current];
  card.classList.add('is-changing');
  window.setTimeout(() => {
    document.querySelector('.story-category').textContent = step.category;
    document.querySelector('.story-symbol').textContent = step.symbol;
    document.querySelector('#stepIndex').textContent = step.index;
    document.querySelector('#stepTitle').textContent = step.title;
    document.querySelector('#stepText').textContent = step.text;
    document.querySelector('#stepFact').textContent = step.fact;
    document.querySelector('#stepTag').textContent = step.tag;
    document.querySelector('#storyMore').href = `detalhe.html?etapa=${current}`;
    document.querySelector('#routeCount').textContent = `${step.index} — 06`;
    document.querySelector('.route-foot span:last-child').textContent = `${step.index} / 06`;
    document.querySelector('.route-progress').style.height = `${(current / (steps.length - 1)) * 100}%`;
    stops.forEach((stop, i) => {
      stop.classList.toggle('active', i === current);
      if (i === current) stop.setAttribute('aria-current', 'step');
      else stop.removeAttribute('aria-current');
    });
    card.classList.remove('is-changing');
  }, 140);
}

stops.forEach((stop) => stop.addEventListener('click', () => showStep(Number(stop.dataset.step))));
document.querySelector('#prevStep').addEventListener('click', () => showStep(current - 1));
document.querySelector('#nextStep').addEventListener('click', () => showStep(current + 1));
document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (event.key === 'ArrowRight') showStep(current + 1);
  if (event.key === 'ArrowLeft') showStep(current - 1);
});
card.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
card.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 55) showStep(current + (delta < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });
card.addEventListener('click', (event) => {
  if (event.target.closest('button, a')) return;
  window.location.href = `detalhe.html?etapa=${current}`;
});
card.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    if (event.target === card) window.location.href = `detalhe.html?etapa=${current}`;
  }
});
