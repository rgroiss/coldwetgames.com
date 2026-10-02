(() => {
  const locales = {
    en: {
      meta: {
        title: "Roman Groiss – Game Developer Portfolio",
        description:
          "Personal portfolio of Roman Groiss, a game developer from Austria. Selected games, student projects and development work.",
      },
      accessibility: {
        skipToWork: "Skip to selected work",
      },
      brand: {
        headerName: "Roman Groiss",
        homeLabel: "Roman Groiss portfolio home",
      },
      navigation: {
        label: "Primary navigation",
        work: "Projects",
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
        eyebrow: "Game developer / Austria",
        titleMain: "Roman",
        titleAccent: "Groiss",
        intro: "My personal portfolio of games and interactive projects I've worked on.",
        statusLabel: "Work in progress",
        status: "This website and its project archive are still being built.",
        markCaption: "Personal portfolio / {year}",
        featured: "Featured project",
        explore: "Explore my projects",
        projectAction: "View project",
        projectAriaLabel: "View the Your Suffering Is Important to Us portfolio entry",
        scroll: "Scroll to explore",
        drag: "Drag to rotate",
      },
      work: {
        eyebrow: "Selected work",
        title: "Selected projects, newest first.",
        intro: "My game-development work, from student projects to independent games.",
      },
      projects: {
        labels: {
          state: "Status",
          destination: "Project reference",
          role: "My role",
          technology: "Technology",
          context: "Context",
        },
        yourSuffering: {
          number: "01",
          capsuleTitle: "YSIITU",
          mediaState: "In development",
          kicker: "Independent project / Unity",
          title: "Your Suffering Is Important to Us",
          description:
            "An incremental management game I'm developing, set in a bureaucratic version of Hell. Its systems centre on managing imployees, processing petty sinners and automating absurd punishments as part of a corporate hierarchy.",
          state: "In development",
          context: "Independent project",
          technology: "Unity",
          action: "More information forthcoming",
          steamState: "In development",
          destination: "Steam",
          steamAction: "Steam page",
          steamAriaLabel:
            "Your Suffering Is Important to Us project reference on Steam",
          steamArtAlt:
            "Your Suffering Is Important to Us official Steam artwork",
          artAlt:
            "Development slate for Your Suffering Is Important to Us",
        },
        heavyWake: {
          number: "02",
          kicker: "Independent project / 2026",
          title: "Heavy Wake",
          description:
            "A dark-fantasy deckbuilding RPG I worked on, set on a cursed island and designed around a 30\u201360 minute playthrough.",
          state: "Released 6 July 2026",
          destination: "Steam",
          action: "Steam page",
          ariaLabel: "Heavy Wake project reference on Steam",
          artAlt: "Heavy Wake official game artwork",
        },
        uberDose: {
          number: "03",
          kicker: "Student project",
          title: "UBER//DOSE",
          description:
            "An earlier student project on which I was the main developer.",
          state: "Released",
          destination: "itch.io",
          role: "Main developer",
          context: "Student project",
          action: "itch.io page",
          ariaLabel: "UBER//DOSE project reference on itch.io",
          artAlt: "UBER//DOSE official game artwork",
        },
      },
      about: {
        eyebrow: "About",
        title: "Roman Groiss",
        intro: "I'm a game developer from Austria. This portfolio brings together games and interactive projects I've worked on. Some independent projects have been released under the name Cold and Wet Studios.",
        contactAction: "Get in touch",
        portraitAlt: "Portrait of Roman Groiss smiling against a grey background",
      },
      footer: {
        copyright: "\u00A9 {year} Roman Groiss",
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
