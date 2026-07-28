(() => {
  const locales = {
    en: {
      meta: {
        title: "Cold and Wet Games",
        description:
          "Cold and Wet Games is an independent game studio from Austria, founded by Roman Groiss.",
      },
      brand: {
        mark: "CW//G",
        homeLabel: "Cold and Wet Games home",
        logoAlt: "Cold and Wet Games mountain logo",
      },
      navigation: {
        label: "Primary navigation",
        work: "Work",
        about: "About",
        contact: "Contact",
      },
      hero: {
        eyebrow: "Independent game studio · Austria",
        titleMain: "Cold and Wet",
        titleAccent: "Games",
        intro:
          "Cold and Wet Games is an independent studio founded by game developer and artist Roman Groiss.",
        status: "This website is currently a work in progress.",
        logoCaption: "An edge above the waterline.",
      },
      work: {
        eyebrow: "Selected games",
        title: "A few worlds so far.",
        intro: "More project details and roles will arrive here soon.",
      },
      projects: {
        ueberdose: {
          title: "Ueberdose",
          platform: "itch.io",
          action: "Visit project",
          ariaLabel: "Visit Ueberdose on itch.io",
        },
        heavyWake: {
          title: "Heavy Wake",
          platform: "Steam",
          action: "Visit project",
          ariaLabel: "Visit Heavy Wake on Steam",
        },
        yourSuffering: {
          title: "Your Suffering Is Important to Us",
          platform: "In development",
          action: "Details forthcoming",
          ariaLabel: "Your Suffering Is Important to Us, details forthcoming",
        },
      },
      about: {
        eyebrow: "About",
        title: "Roman Groiss",
        intro:
          "Game developer and artist. A more complete bio is on its way.",
        contactAction: "Get in touch",
        portraitAriaLabel: "Reserved space for a future portrait of Roman Groiss",
        portraitLabel: "Portrait forthcoming",
        portraitCaption: "A place for a future photo.",
      },
      footer: {
        copyright: "© {year} Cold and Wet Games",
        email: "contact@coldwetgames.com",
      },
    },
  };

  const locale = locales[document.documentElement.lang] ? document.documentElement.lang : "en";
  const messages = locales[locale];

  const messageFor = (path) =>
    path.split(".").reduce((value, key) => value?.[key], messages) ?? "";

  const format = (message) =>
    String(message).replace("{year}", String(new Date().getFullYear()));

  document.documentElement.lang = locale;
  document.title = format(messageFor("meta.title"));

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", format(messageFor("meta.description")));
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = format(messageFor(element.dataset.i18n));
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((definition) => {
      const separator = definition.indexOf(":");
      const attribute = definition.slice(0, separator).trim();
      const key = definition.slice(separator + 1).trim();

      if (attribute && key) {
        element.setAttribute(attribute, format(messageFor(key)));
      }
    });
  });
})();
