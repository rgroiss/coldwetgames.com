(() => {
  const locales = {
    en: {
      meta: {
        title: "Cold and Wet Studios",
        description:
          "Cold and Wet Studios is an independent game-development and visual-design studio from Austria, founded by Roman Groiss.",
      },
      accessibility: {
        skipToWork: "Skip to selected work",
      },
      brand: {
        headerName: "Cold and Wet Studios",
        homeLabel: "Cold and Wet Studios home",
      },
      navigation: {
        label: "Primary navigation",
        work: "Work",
        about: "About",
        contact: "Contact",
      },
      motion: {
        label: "Motion",
        on: "On",
        off: "Off",
        hint: "Toggle animations. Reduced-motion preferences are always respected.",
      },
      hero: {
        eyebrow: "Independent game studio / Austria",
        titleMain: "Cold and Wet",
        titleAccent: "Studios",
        intro: "Games, development, and visual design by Roman Groiss.",
        statusLabel: "Work in progress",
        status: "This website and its project archive are still being built.",
        markCaption: "Studio mark / {year}",
        featured: "In the spotlight",
        explore: "Explore the games",
        scroll: "Scroll to explore",
        drag: "Drag to rotate",
      },
      work: {
        eyebrow: "Selected work",
        title: "Selected games, newest first.",
        intro: "Studio releases and earlier work by Roman Groiss.",
      },
      projects: {
        labels: {
          state: "State",
          destination: "Find it",
          role: "Role",
          context: "Context",
        },
        yourSuffering: {
          number: "01",
          capsuleTitle: "YSIITU",
          mediaState: "In development",
          kicker: "Cold and Wet Studios",
          title: "Your Suffering Is Important to Us",
          description:
            "Run a corporate office in Hell. Manage imployees, reject petty sinners, and automate absurd punishments as you climb the corporate ladder in this comedic incremental management game.",
          state: "In development",
          context: "Studio project",
          action: "More information forthcoming",
          steamState: "Coming soon on Steam",
          destination: "Steam",
          steamAction: "Wishlist on Steam",
          steamAriaLabel:
            "Wishlist Your Suffering Is Important to Us on Steam",
          steamArtAlt:
            "Your Suffering Is Important to Us official Steam artwork",
          artAlt:
            "Development slate for Your Suffering Is Important to Us",
        },
        heavyWake: {
          number: "02",
          kicker: "Cold and Wet Studios / 2026",
          title: "Heavy Wake",
          description:
            "A focused 30\u201360 minute dark-fantasy deckbuilding RPG set on a cursed island.",
          state: "Released 6 July 2026",
          destination: "Steam",
          action: "Open on Steam",
          ariaLabel: "Open Heavy Wake on Steam",
          artAlt: "Heavy Wake official game artwork",
        },
        uberDose: {
          number: "03",
          kicker: "Pre-studio student work",
          title: "UBER//DOSE",
          description:
            "A student project created before Cold and Wet Studios, with Roman Groiss as main developer.",
          state: "Released",
          destination: "itch.io",
          role: "Main developer",
          context: "Student project",
          action: "Open on itch.io",
          ariaLabel: "Open UBER//DOSE on itch.io",
          artAlt: "UBER//DOSE official game artwork",
        },
      },
      about: {
        eyebrow: "About",
        title: "Roman Groiss",
        intro: "Game developer and founder of Cold and Wet Studios.",
        contactAction: "Get in touch",
        portraitAlt: "Portrait of Roman Groiss smiling against a grey background",
      },
      footer: {
        copyright: "\u00A9 {year} Cold and Wet Studios",
        email: "contact@coldwetgames.com",
        backToTop: "Back to top",
      },
    },
  };

  const requestedLocale = document.documentElement.lang;
  const locale = locales[requestedLocale] ? requestedLocale : "en";
  const messages = locales[locale];

  const messageFor = (path) =>
    path.split(".").reduce((value, key) => value?.[key], messages) ?? "";

  const format = (message) =>
    String(message).replaceAll("{year}", String(new Date().getFullYear()));

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
