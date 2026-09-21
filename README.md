# Cold and Wet Studios website

A static game gallery for [coldwetgames.com](https://coldwetgames.com), hosted with GitHub Pages. The redesign uses local fonts, Three.js for a decorative desktop exhibit, and GSAP/ScrollTrigger for optional motion. No build step, backend, or CDN connection is needed at runtime.

## Local preview

From this repository:

~~~powershell
node scripts/preview.mjs
~~~

Open http://127.0.0.1:8000. To use another port, run `node scripts/preview.mjs 8001`. The preview server binds only to the loopback interface and disables browser caching. Refresh after editing files.

A generic static server also works. Opening index.html directly from the filesystem does not support the 3D ES module imports.

## Validation

~~~powershell
node scripts/validate-site.mjs
node --check localization.js
node --check gallery.js
node --check scene.mjs
node --check scripts/preview.mjs
git diff --check
~~~

Validation covers localisation bindings, unlocalised HTML text, HTML/CSS/module asset references, dependency and font licence files, project order, public section anchors, required portfolio information, wishlist tracking, motion-control semantics, and encoding.

Browser checks should cover 320px, 390px, 768px, 1280px and 1440px layouts; keyboard focus and anchor links; reduced motion; the persistent motion toggle; absent graphics/animation libraries; and WebGL context loss. Confirm that artwork and project descriptions remain available in every fallback.

## Content and localisation

All visible copy, metadata, image alternatives and control labels live in `localization.js`. Bind text using `data-i18n` and attributes using `data-i18n-attr`. English is currently the only dictionary; unknown document languages fall back to English. Keep information in the DOM, outside the decorative canvas.

YSIITU's official artwork, coming-soon status and tracked wishlist links are static. The older Steam-publication scripts and status JSON remain in the repository for historical compatibility; the page does not load or poll them.

## Motion and rendering

Motion respects the operating system's reduced-motion setting. The header toggle also allows visitors to pause motion, with their choice stored locally when storage is available. Reduced motion always takes precedence.

The desktop 3D display loads only when motion is enabled and the device has a fine pointer and a viewport wider than 760px. Rendering stops offscreen and in background tabs. Its pixel ratio is capped at 1.5. Mobile, unsupported WebGL, and context-loss states retain the original HTML artwork. All project links are ordinary accessible HTML links.

## Dependencies and design

See `docs/design-system.md` for the current visual system, `docs/external-sources.md` for asset origins and pinned dependencies, and `docs/validation.md` for the local review record. Earlier research documents describe previous designs and are not the specification for this redesign.

## Publishing

GitHub Pages continues to deploy the repository root from `main`. The CNAME and DNS setup are unchanged. Review the local preview before pushing or merging the redesign branch.
