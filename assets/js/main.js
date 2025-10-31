(() => {
  const html = document.documentElement;
  const header = document.querySelector('.site-header');
  const navTrigger = document.querySelector('.nav-trigger');
  const navDrawer = document.querySelector('.nav-drawer');
  const navOverlay = document.querySelector('.nav-overlay');
  const navList = document.querySelector('.nav-list');
  const navIndicator = document.querySelector('.nav-indicator');
  const primaryLinks = navList ? Array.from(navList.querySelectorAll('a')) : [];
  const drawerLinks = navDrawer ? Array.from(navDrawer.querySelectorAll('a')) : [];
  const yearEl = document.getElementById('year');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setNav(open) {
    if (!navTrigger || !navDrawer) return;
    navTrigger.setAttribute('aria-expanded', String(open));
    html.classList.toggle('nav-open', open);
    if (navOverlay) navOverlay.toggleAttribute('hidden', !open);
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function updateHeaderState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  if (navTrigger) {
    navTrigger.addEventListener('click', () => {
      const isOpen = navTrigger.getAttribute('aria-expanded') === 'true';
      setNav(!isOpen);
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => setNav(false));
  }

  if (navDrawer) {
    navDrawer.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('a')) {
        setNav(false);
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setNav(false);
    }
  });

  function getActiveNavLink() {
    if (!primaryLinks.length) return null;
    return primaryLinks.find((link) => link.getAttribute('aria-current') === 'page') || primaryLinks[0];
  }

  let indicatorInitialized = false;

  function positionIndicator(target, { immediate = false } = {}) {
    if (!navIndicator || !navList || !target) return;
    const targetRect = target.getBoundingClientRect();
    const listRect = navList.getBoundingClientRect();
    const offsetX = targetRect.left - listRect.left;

    const shouldBypassTransition = immediate && !indicatorInitialized;

    if (shouldBypassTransition) {
      navIndicator.style.transition = 'none';
    }

    navIndicator.style.width = `${targetRect.width}px`;
    navIndicator.style.transform = `translateX(${offsetX}px)`;

    if (shouldBypassTransition) {
      void navIndicator.offsetWidth;
      navIndicator.style.transition = '';
    }

    if (!indicatorInitialized) {
      navIndicator.classList.add('is-ready');
      indicatorInitialized = true;
    }
  }

  let indicatorResetTimeout;

  function resetIndicator() {
    window.clearTimeout(indicatorResetTimeout);
    indicatorResetTimeout = window.setTimeout(() => {
      positionIndicator(getActiveNavLink());
    }, 120);
  }

  if (primaryLinks.length) {
    positionIndicator(getActiveNavLink(), { immediate: true });
    window.setTimeout(() => positionIndicator(getActiveNavLink()), 250);
    window.addEventListener('resize', () => positionIndicator(getActiveNavLink()));

    primaryLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => positionIndicator(link));
      link.addEventListener('focus', () => positionIndicator(link));
      link.addEventListener('mouseleave', resetIndicator);
      link.addEventListener('blur', resetIndicator);
      link.addEventListener('click', () => {
        window.clearTimeout(indicatorResetTimeout);
        primaryLinks.forEach((navLink) => {
          if (navLink !== link) {
            navLink.removeAttribute('aria-current');
          }
        });
        link.setAttribute('aria-current', 'page');
        positionIndicator(link);
      });
    });

    if (navList) {
      navList.addEventListener('mouseleave', resetIndicator);
    }
  }

  const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));

  if (revealTargets.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  const parallaxTargets = prefersReducedMotion ? [] : Array.from(document.querySelectorAll('[data-parallax]'));
  let pointerX = 0;
  let pointerY = 0;
  let ticking = false;

  function applyParallax() {
    ticking = false;
    parallaxTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (pointerX - centerX) / rect.width;
      const distanceY = (pointerY - centerY) / rect.height;
      const translateX = distanceX * 16;
      const translateY = distanceY * 16;
      el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });
  }

  function handlePointerMove(event) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(applyParallax);
    }
  }

  if (parallaxTargets.length) {
    document.addEventListener('pointermove', handlePointerMove);
  }

  const navCollections = [...primaryLinks, ...drawerLinks];
  navCollections.forEach((link) => {
    link.addEventListener('click', () => {
      if (link.hash && document.querySelector(link.hash)) {
        requestAnimationFrame(() => {
          setNav(false);
        });
      }
    });
  });
})();
