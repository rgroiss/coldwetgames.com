# Design research - Cold and Wet Studios

Research refreshed on 28 July 2026 after a second audit of the working redesign.

> **Layout update:** the oversized paired-project direction in this document is
> superseded by the compact catalogue recommendation in
> [`compact-catalogue-research.md`](compact-catalogue-research.md). This document
> remains as the record of the earlier research pass.

## Repository audit

- **Platform:** one-page static HTML, CSS, and vanilla JavaScript deployed through GitHub Pages.
- **Dependencies:** none. There is no package manager, build step, framework, or animation library.
- **Content system:** all interface copy is stored in `localization.js`; the HTML uses `data-i18n` bindings.
- **Available visual material:** a transparent studio mountain mark, one Heavy Wake environment image, and one UBER//DOSE title image.
- **Known content limits:** no approved portrait, YSIITU artwork, trailers, gameplay clips, full contribution lists, or case-study narratives are stored in the repository.
- **Project context:** Heavy Wake is a Cold and Wet Studios release. UBER//DOSE is a student project that predates the studio; Roman Groiss was its main developer.

## Critique of the first redesign

The first archive pass improved chronology and removed generic cards, but it still behaved like a polished template:

- the oversized hero delayed the actual games;
- every project used nearly the same stacked composition;
- the typography carried more identity than the game material;
- the logo parallax and generic reveal-on-scroll motion did not explain or support the work;
- the missing YSIITU artwork became a large placeholder rather than a useful development record.

The initial second pass prioritized a scroll-, hover-, and focus-driven split-screen catalogue. Hands-on review showed that the shared sticky image field made later artwork feel physically attached to the first project. The implemented direction now keeps the same editorial 5/7 catalogue proportions while pairing every image directly with its project.

## Required-source review

| Source | Strongest relevant finding | Technology / availability | Licence and decision |
| --- | --- | --- | --- |
| [21st.dev](https://21st.dev/) | [Hover Image Preview](https://21st.dev/community/components/avanishverma4/hover-image-preview) validates a project-list-to-image-preview pattern. | React, Tailwind, shadcn registry; community component | 21st documentation says community components are MIT, while [21st terms](https://21st.dev/terms) separately prohibit reuse of its demo/preview media. **Reference only:** no code, metadata, or preview media copied. |
| [React Bits](https://reactbits.dev/) | Pixel Transition and Scroll Stack demonstrate coherent image switching and stacking, while Texture Lab suggests restrained dither treatments. | React components; free library | [MIT + Commons Clause](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md): use inside a site is allowed, redistribution of components is not. **Rejected for integration:** React and its animation dependencies are disproportionate here. |
| [Codrops](https://tympanus.net/codrops/) | [Menu Image Animation on Hover](https://tympanus.net/codrops/2020/07/01/creating-a-menu-image-animation-on-hover/) and [Large Image to Content](https://tympanus.net/codrops/2022/08/03/large-image-to-content-page-transition/) offer strong project-navigation principles. | Vanilla markup plus GSAP/Lenis in the demos | Downloadable demos are MIT unless stated otherwise ([licence](https://tympanus.net/codrops/licensing/)); demo photography can have separate restrictions. **Principles only:** implement an original, smaller vanilla interaction and use only studio-provided images. |
| [Made in Webflow](https://webflow.com/made-in-webflow/portfolio?cloneable=true) | [Portfolio Intro Splitscreen Scroll Animation](https://webflow.com/made-in-webflow/website/intro-splitscreen-scroll-animation) demonstrates a useful sticky split; [Interactive Sketch Portfolio](https://webflow.com/made-in-webflow/website/interactive-sketch-portfolio) demonstrates playful input. | Cloneable Webflow projects; the sketch example uses sketch.js | Cloneable in Webflow under platform/creator terms. **Structural reference only:** no migration to Webflow and no copied export. The sketch interaction is rejected as unrelated to the games. |
| [One Page Love](https://onepagelove.com/portfolio-templates) | [Sphere](https://onepagelove.com/sphere) has image sliders and a compact closing bio; [SwissBrut](https://onepagelove.com/swissbrut) demonstrates bold type without ornamental effects. | Sphere is static HTML; SwissBrut is Framer | Sphere free is CC BY 3.0 with a required footer link; its $9 Pro version removes the credit. SwissBrut is a free Framer clone. **Not integrated:** useful hierarchy references, but neither is specific enough to the studio. |
| [Framer Marketplace](https://www.framer.com/community/marketplace/templates/categories/portfolio/) | [Unmade](https://www.framer.com/community/marketplace/templates/unmade/) combines a light editorial work/archive system with individual project pages. | Framer CMS template; free to use in Framer | Framer Marketplace Limited License. **Reference only:** its archive/content hierarchy supports direction two; no assets or source copied. |
| [ThemeForest](https://themeforest.net/category/site-templates/creative/portfolio) | Anotte and other horizontal HTML portfolios show how one strong gallery behavior can organize large images. | Paid HTML and CMS themes | A [Regular License](https://themeforest.net/licenses/terms/regular) permits one customized end product after purchase. **Purchase shortlist only:** do not copy previews or source without a licence. |
| [Cargo templates](https://cargo.site/templates) | Basic Feed, Grid, and Slideshow templates keep artwork dominant and navigation sparse. | Cargo platform templates | Platform/template terms apply; export and reuse rights must be checked for a selected template. **Reference only:** reuse the feed/slideshow principles in local HTML/CSS. |
| [Readymag portfolio templates](https://readymag.com/templates/portfolio) | Origami, Unveil, and Poster Click treat portfolios like editorial objects rather than product landing pages. | Readymag; free and paid templates | Item- and platform-specific rights apply. **Reference/purchase shortlist:** no template files copied. |
| [Craftwork](https://craftwork.design/) | Editorial icon, mockup, type, and 3D families could support a later physical field-guide motif. | Downloadable design packs; free and paid | The [commercial licence](https://craftwork.design/license/) allows use in digital end products but prohibits redistribution; demo files are personal-only. **No pack selected or integrated.** |
| [UI8 portfolio assets](https://ui8.net/tags/portfolio) | Potential source for a coherent archival icon or editorial mockup family. | Paid marketplace assets | No sufficiently authoritative item-level licence was available during this review. **Purchase shortlist only:** verify the exact product and licence before download or use. |
| [Envato Elements](https://elements.envato.com/web-templates/portfolio) | A broad backup catalogue of HTML portfolio templates and graphic packs. | Subscription downloads | The [Elements licence](https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License) requires a registered licence for each project/end use and prohibits source redistribution. **No item integrated.** |
| [Spline Community](https://community.spline.design/) | A future option for one low-poly archival object or island diorama. | Spline 3D scenes and runtime | Spline states that community files are [CC0 1.0](https://docs.spline.design/basics/community-platform). **Deferred:** the runtime cost is not justified by the current content. |

## Focused template/layout shortlist

### 1. Webflow split-screen portfolio interaction

- **Type:** cloneable interaction/layout reference.
- **Technology:** Webflow interactions and CSS layout.
- **Reuse:** a sticky visual field paired with scrolling project records.
- **Direct integration:** no. Rebuild the underlying information pattern in original vanilla code.
- **Manual action:** none.

### 2. Unmade editorial archive

- **Type:** complete Framer portfolio/archive template.
- **Technology:** Framer CMS, components, and page transitions.
- **Reuse:** editorial project hierarchy and the separation between current work, archive, and journal.
- **Direct integration:** no; Limited License and platform-specific implementation.
- **Manual action:** duplicate in Framer only if the site later migrates platforms.

### 3. Cargo feed/slideshow system

- **Type:** complete platform template family.
- **Technology:** Cargo.
- **Reuse:** image dominance, sparse navigation, and one media behavior used consistently.
- **Direct integration:** no.
- **Manual action:** a Cargo plan/template selection would be required for a platform migration.

### Premium alternative: Anotte horizontal HTML

- **Type:** paid horizontal portfolio template.
- **Technology:** HTML/CSS/JavaScript.
- **Reuse:** large-image sequencing and horizontal project pacing.
- **Direct integration:** only after purchasing a ThemeForest Regular License and reviewing bundled third-party assets.
- **Manual action:** purchase required; not recommended for this first version.

## Interaction shortlist

| Pattern | Source | Intended lesson | V1 decision |
| --- | --- | --- | --- |
| Project row changes a persistent image | Codrops menu-image hover; 21st hover preview | Let the index itself control visual material | **Rejected after implementation review:** the changing image became visually detached from later project records. |
| Split-screen sticky media | Webflow split-screen cloneable | Keep context visible while project facts move | **Use only for the 5/7 proportions:** every project receives its own paired media field instead of a shared sticky field. |
| Clip-based image change | React Bits Pixel Transition | Give image changes a material edge without a flashy background | **Rejected after implementation review:** no switching transition is needed when artwork remains paired. |
| Large image into case study | Codrops Large Image to Content | Create continuity between archive and future project pages | **Defer** until real case-study pages and more images exist. |
| Horizontal image reel | ThemeForest Anotte / Cargo slideshow | Make multiple screenshots feel like a sequence | **Defer** until each game has at least three approved images. |
| Drawing/sketch input | Webflow Interactive Sketch Portfolio | A single playful interaction can establish personality | **Reject for V1:** enjoyable, but unrelated to the current game material. |
| Dither/texture processing | React Bits Texture Lab | Use a single processing treatment across owned images | **Optional later:** only if applied to supplied art and tested for legibility. |

## Graphic and asset-pack directions

1. **Studio-owned game material - use now.** Mountain mark, Heavy Wake art, and UBER//DOSE art remain the only visual family in V1.
2. **Processed production stills - future.** A consistent dither or two-colour print treatment can be created from studio-owned screenshots; do not source placeholder illustrations.
3. **Craftwork editorial/archival pack - purchase candidate.** Select one exact family and record its commercial licence before adding files.
4. **Spline low-poly object - deferred CC0 option.** Consider only if a single 3D object becomes central to the final concept; do not add a runtime for decoration.

## Three design directions

### Direction A - The Wet Index (recommended)

- **Concept:** a field catalogue of games and development records. It feels like an index being actively maintained, not a finished agency sales page.
- **Layout:** compact masthead followed by an editorial catalogue. Each project is a two-column record with copy on the left and its own media field on the right. Heavy Wake uses the official Steam widget in that field; mobile places media directly after the title.
- **Typography:** robust system sans for titles, editorial Georgia italic for the studio accent, and monospace for facts/status.
- **Navigation:** short anchor navigation and clearly labelled external project links.
- **Project presentation:** newest first. Every record shows context, concise description, verified facts, and an official destination. UBER//DOSE is explicitly pre-studio student work with Roman's main-developer role.
- **Motion:** only a restrained scale response on linked project artwork. No entry parade, image switching, parallax logo, smooth-scroll hijacking, or animated background.
- **Graphic language:** warm black, paper white, turquoise status, violet studio accent, square media, no ornamental rules.
- **Pixel art:** Heavy Wake artwork is shown cleanly at large scale. Pixel processing is never applied as unrelated decoration.
- **Advantages:** projects appear quickly, artwork cannot be confused with a neighboring project, the page remains dependency-free, and limited content still feels intentional.
- **Risks:** stronger case studies still depend on more approved media and role copy.
- **Research support:** Cargo feed layouts, Webflow split-screen proportions, Framer Unmade's editorial archive hierarchy, and SwissBrut's typographic restraint.

### Direction B - Paper Exhibition

- **Concept:** a light, museum-like exhibition programme for games and production artifacts.
- **Layout:** off-white field, large image plates, compact captions, and generous project rooms separated by space rather than containers.
- **Typography:** high-contrast serif display with neutral sans captions.
- **Navigation:** fixed table of contents and numbered exhibit anchors.
- **Project presentation:** each game becomes a full-width plate followed by process captions and a contribution note.
- **Motion:** quiet masking and caption reveals only.
- **Graphic language:** black ink, off-white paper, violet and turquoise as print spot colours.
- **Pixel art:** framed as source material, never enlarged as a page background without context.
- **Advantages:** clearly avoids dark-SaaS conventions and suits future process imagery.
- **Risks:** current dark game artwork and the established user preference for a dark site make this less natural now.
- **Research support:** Framer Unmade, Readymag Origami/Unveil, SwissBrut.

### Direction C - Playable Production Desk

- **Concept:** a studio workbench where projects appear as open development files rather than portfolio cards.
- **Layout:** a colourful desktop-like canvas with a file index, media viewer, and optional draggable artifacts.
- **Typography:** utilitarian mono UI combined with large expressive project titles.
- **Navigation:** keyboard shortcuts and a normal visible index; no fake operating-system chrome.
- **Project presentation:** layered screenshots, short production notes, and context-specific external links.
- **Motion:** one drag interaction plus restrained file opening/closing.
- **Graphic language:** muted violet canvas, turquoise selection state, paper sheets, supplied game sprites only.
- **Pixel art:** actual sprites could function as draggable artifacts once supplied.
- **Advantages:** playful and memorable, closest to the reference portfolio's sense of discovery.
- **Risks:** likely gimmicky with only two approved images and no sprites; much harder to keep accessible on touch devices.
- **Research support:** Webflow Interactive Sketch, 21st component catalogue, Spline Community, Codrops page transitions.

## Recommendation

Build **The Wet Index** as paired editorial records. It corrects the first pass rather than merely reskinning it: every game owns a clear block of copy and artwork, real project material appears early, and decorative motion is removed. The system uses one catalogue proportion, one typography system, one restrained hover response, and one asset family consisting only of studio/project-owned art.

## Implementation boundaries and follow-up content

- No external template code, component code, font, preview image, paid asset, or 3D scene will be added.
- The official Steam widget remains an optional embedded enhancement with a normal Steam link as fallback.
- Individual case-study pages remain incomplete until approved roles, screenshots, trailers, and production notes exist. The V1 record system is designed to expand into those pages without a visual rebuild.
- YSIITU uses a factual development slate, not invented artwork.

## Run and test

Serve the repository root with a local static server such as `python -m http.server 8000` and open `http://localhost:8000`. Test desktop project/media alignment, keyboard focus through project links, narrow mobile stacking, external destinations, the Steam fallback link, and reduced-motion mode. Before publishing, run JavaScript syntax, localisation-binding, local-asset, class-selector, and whitespace checks.
