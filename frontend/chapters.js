(() => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('pagina')) return;

  const chapters = [
    { title: 'Boas-vindas', items: ['#inicio', '.intro-strip'] },
    { title: 'A jornada da energia', items: ['#jornada'] },
    { title: 'Rotas da energia', items: ['#rotas-energia'] },
    { title: 'A rede na UFRB', items: ['#rede-ufrb'] },
    { title: 'Energia no campus', items: ['#no-campus'] },
    { title: 'Faça parte', items: ['#agir', '.closing'] }
  ];
  const requested = Number.parseInt(params.get('pagina'), 10);
  const current = Number.isInteger(requested) ? Math.max(0, Math.min(chapters.length - 1, requested)) : 0;
  const main = document.querySelector('main');
  const allSections = [...main.querySelectorAll(':scope > section')];
  const selected = new Set(chapters[current].items.map((selector) => document.querySelector(selector)));

  document.body.classList.add('chapter-mode');
  allSections.forEach((section) => {
    const visible = selected.has(section);
    section.hidden = !visible;
    if (!visible) section.setAttribute('aria-hidden', 'true');
    else section.removeAttribute('aria-hidden');
  });
  document.querySelector('.brand').href = '?pagina=0';
  document.querySelector('.top-cta').href = `?pagina=${Math.min(current + 1, chapters.length - 1)}`;
  document.querySelectorAll('.topbar nav a').forEach((link, index) => {
    link.setAttribute('aria-current', index + 1 === current ? 'page' : 'false');
  });

  const pager = document.createElement('nav');
  pager.className = 'chapter-pager';
  pager.setAttribute('aria-label', 'Navegar entre capítulos');
  pager.innerHTML = `<a ${current === 0 ? 'aria-disabled="true"' : `href="?pagina=${current - 1}"`}>← Anterior</a><span>CAPÍTULO ${String(current + 1).padStart(2, '0')} / ${String(chapters.length).padStart(2, '0')}<strong>${chapters[current].title}</strong></span><a ${current === chapters.length - 1 ? 'aria-disabled="true"' : `href="?pagina=${current + 1}"`}>Próximo →</a>`;
  main.append(pager);
  document.title = `${chapters[current].title} — Energia em percurso · UFRB`;
  window.addEventListener('load', () => window.dispatchEvent(new Event('chapterchange')), { once: true });
  window.scrollTo(0, 0);
})();
