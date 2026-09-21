(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
  const stage = document.querySelector('[data-art-stage]');
  let userPaused = false;
  let animationContext;
  let exhibit;
  let generation = 0;
  let sceneUnavailable = false;
  let sceneLoading = false;
  let lavaFields;
  let lavaLoading = false;
  let lavaUnavailable = false;

  try { userPaused = localStorage.getItem('coldwet-motion') === 'off'; } catch { /* Storage is optional. */ }

  const motionEnabled = () => !reducedMotion.matches && !userPaused;

  function animatePage(enabled) {
    animationContext?.revert();
    animationContext = undefined;
    const { gsap, ScrollTrigger } = window;
    if (!enabled || !gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    animationContext = gsap.context(() => {
      // Elements are visible in CSS; only a working animation engine adds transforms.
      gsap.from('.hero__title', {
        y: 24, duration: 1.05,
        ease: 'power3.out', clearProps: 'transform',
      });
      gsap.from('.hero__intro, .hero__explore, .hero__exhibit', {
        y: 22, duration: .9, stagger: .1, ease: 'power3.out', clearProps: 'transform',
      });
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 42, duration: .85, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      if (desktop.matches) {
        gsap.fromTo('.wake-art__landscape', { yPercent: -5, scale: 1.12 }, {
          yPercent: 5, scale: 1.12, ease: 'none',
          scrollTrigger: { trigger: '.wake-art', start: 'top bottom', end: 'bottom top', scrub: .7 },
        });
      }
    });
  }

  async function updateExhibit(enabled) {
    const currentGeneration = ++generation;
    if (!desktop.matches) {
      exhibit?.dispose();
      exhibit = undefined;
      return;
    }
    if (exhibit) {
      exhibit.setEnabled(enabled);
      return;
    }
    if (!enabled || sceneUnavailable || sceneLoading) return;

    sceneLoading = true;
    try {
      const { createExhibit } = await import('./scene.mjs?v=textures-2');
      if (currentGeneration !== generation) return;
      const nextExhibit = await createExhibit(stage);
      if (currentGeneration !== generation) {
        nextExhibit.dispose();
        return;
      }
      exhibit = nextExhibit;
      exhibit.setEnabled(motionEnabled());
    } catch {
      // The complete, localised HTML artwork is already present underneath the canvas.
      sceneUnavailable = true;
      stage.dataset.rendered = 'false';
      stage.dataset.interactive = 'false';
      stage.dataset.scene = 'unavailable';
    } finally {
      sceneLoading = false;
      // Rapid preference/viewport changes must not create two renderers on one canvas.
      if (currentGeneration !== generation) void updateExhibit(motionEnabled());
    }
  }

  async function updateLava(enabled) {
    if (!desktop.matches) {
      lavaFields?.dispose();
      lavaFields = undefined;
      return;
    }
    if (lavaFields) { lavaFields.setEnabled(enabled); return; }
    if (!enabled || lavaLoading || lavaUnavailable) return;
    lavaLoading = true;
    try {
      const { createLavaFields } = await import('./lava.mjs?v=textures-1');
      if (!desktop.matches || !motionEnabled()) return;
      lavaFields = createLavaFields();
      lavaFields.setEnabled(motionEnabled());
    } catch {
      // The CSS background contains a committed still of the same lava field.
      lavaUnavailable = true;
    } finally { lavaLoading = false; }
  }

  function applyMotion() {
    const enabled = motionEnabled();
    root.dataset.motion = enabled ? 'on' : 'off';
    toggle.hidden = false;
    toggle.disabled = reducedMotion.matches;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.querySelector('[data-motion-on]').hidden = !enabled;
    toggle.querySelector('[data-motion-off]').hidden = enabled;
    try { animatePage(enabled); } catch { /* Other enhancements remain independent. */ }
    void updateExhibit(enabled);
    void updateLava(enabled);
  }

  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('coldwet-motion', userPaused ? 'off' : 'on'); } catch { /* Optional. */ }
    applyMotion();
  });
  reducedMotion.addEventListener('change', applyMotion);
  desktop.addEventListener('change', applyMotion);
  applyMotion();

  // Keep active navigation aligned with normal document scrolling.
  const navigationLinks = [...document.querySelectorAll('.site-nav a')];
  const navigationObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigationLinks.forEach((link) => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-10% 0px -45% 0px' });
  document.querySelectorAll('#work, #about, #contact').forEach((section) => navigationObserver.observe(section));
  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) navigationLinks.forEach((link) => link.removeAttribute('aria-current'));
  }, { threshold: .5 });
  heroObserver.observe(document.querySelector('.hero'));

  document.fonts.ready.then(() => window.ScrollTrigger?.refresh());
})();
