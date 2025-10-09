(() => {
  const html = document.documentElement;
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const backdrop = document.querySelector('.nav-backdrop');
  const header = document.querySelector('.site-header');

  function setNav(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    html.classList.toggle('nav-open', open);
    if (backdrop) backdrop.toggleAttribute('hidden', !open);
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setNav(!isOpen);
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => setNav(false));
  }

  if (nav) {
    nav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        setNav(false);
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setNav(false);
    }
  });

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();
