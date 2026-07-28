(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const allowMotion = () => !reducedMotion.matches;

  if (allowMotion()) {
    root.classList.add("has-motion");

    const logo = document.querySelector("[data-logo-motion]");
    if (logo) {
      logo.addEventListener("pointermove", (event) => {
        const bounds = logo.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        logo.style.setProperty("--logo-x", `${x * 10}px`);
        logo.style.setProperty("--logo-y", `${y * 10}px`);
        logo.style.setProperty("--logo-rotate", `${x * 1.2}deg`);
      });

      logo.addEventListener("pointerleave", () => {
        logo.style.removeProperty("--logo-x");
        logo.style.removeProperty("--logo-y");
        logo.style.removeProperty("--logo-rotate");
      });
    }

    const revealItems = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16 },
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }
})();
