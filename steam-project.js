(() => {
  const project = document.querySelector("[data-steam-app][data-steam-status]");

  if (!project) {
    return;
  }

  const revealPublishedProject = () => {
    project.querySelectorAll("[data-steam-pending]").forEach((element) => {
      element.hidden = true;
    });

    project.querySelectorAll("[data-steam-live]").forEach((element) => {
      element.hidden = false;
    });

    project.dataset.steamPublished = "true";
  };

  const statusUrl = new URL(project.dataset.steamStatus, document.baseURI);
  statusUrl.searchParams.set(
    "v",
    String(Math.floor(Date.now() / (5 * 60 * 1000))),
  );

  fetch(statusUrl, {
    cache: "no-store",
    credentials: "same-origin",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Steam publication status is unavailable.");
      }

      return response.json();
    })
    .then((status) => {
      if (
        status.published !== true ||
        String(status.appId) !== project.dataset.steamApp
      ) {
        return;
      }

      const image = project.querySelector("[data-steam-image]");

      if (!image) {
        return;
      }

      const revealAfterImageLoad = () => {
        if (image.naturalWidth > 0) {
          revealPublishedProject();
        }
      };

      image.addEventListener("load", revealAfterImageLoad, { once: true });
      image.loading = "eager";
      image.src = image.dataset.steamImage;

      if (image.complete) {
        revealAfterImageLoad();
      }
    })
    .catch(() => {
      // Keep the existing development presentation when the status check fails.
    });
})();
