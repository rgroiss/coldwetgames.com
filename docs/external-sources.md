# External source log

## Resources present or integrated in the site

| Resource | URL / origin | Author / owner | Licence or use basis | Local files affected | Modification | Attribution |
| --- | --- | --- | --- | --- | --- | --- |
| Studio mountain mark | User-provided file | Cold and Wet Studios / Roman Groiss | Supplied for this portfolio | `assets/cold-and-wet-mountain-clean.png` | Transparent crop prepared for web display | None requested |
| Roman Groiss portrait | User-provided photograph (`roman smiling cropped.png`) | Roman Groiss | Supplied for this portfolio | `assets/roman-groiss-portrait.jpg` | Resized from 3958 × 3891 to 1600 × 1573, JPEG-compressed for web delivery, and cropped responsively with CSS | None requested |
| YSIITU Steam page and header | https://store.steampowered.com/app/5017960/Your_Suffering_Is_Important_to_Us/ | Cold and Wet Studios / Steam listing | User-supplied official storefront URL and current official Steam header | `index.html`, `assets/projects/ysiitu-steam-header-56786351.jpg`, `assets/steam/ysiitu.json` | Header refreshed from Steam on 2026-09-07 at its native 460 × 215 size; its content-hashed filename prevents stale cached artwork | Steam branding remains inside the official artwork |
| GitHub Actions Checkout | https://github.com/actions/checkout | GitHub | MIT License | `.github/workflows/sync-steam-page.yml` | Used at major version 4 to check out the live branch for the temporary publication watcher | None required |
| GitHub Actions Setup Node | https://github.com/actions/setup-node | GitHub | MIT License | `.github/workflows/sync-steam-page.yml` | Used at major version 4 to provide Node.js 20 for the temporary publication watcher | None required |
| Heavy Wake environment artwork | User-provided project file | Cold and Wet Studios | Supplied for this portfolio | `assets/projects/heavy-wake.jpg` | Retained as an approved project asset but not displayed in the compact index | None requested |
| Official Heavy Wake Steam header | https://store.steampowered.com/app/4235660/Heavy_Wake/ | Cold and Wet Studios / Steam listing | Official studio storefront artwork | `assets/projects/heavy-wake-steam-header.jpg` | Downloaded at its native 460 × 215 size and scaled down only; links to the official Steam page | None |
| UBER//DOSE artwork | User-provided project file | Student project team; exact artwork credit not recorded in this repository | Supplied for this portfolio | `assets/projects/uberdose.jpg` | Scaled responsively into a compact capsule without cropping | Credit should be added if Roman supplies the artist attribution |
| Heavy Wake factual summary and release information | https://store.steampowered.com/app/4235660/Heavy_Wake/ plus Roman's current playtime correction | Cold and Wet Studios | Official studio/publisher page and studio-owner supplied correction | `localization.js` | Condensed and paraphrased; current duration set to 30-60 minutes | None |

No external template source, component source, font, marketplace graphic, demo screenshot, or 3D scene is integrated. The compact release-index layout and restrained media-hover treatment are original CSS written for this repository.

## Research references - not integrated

| Resource | URL | Author / platform | Licence / restriction | Decision |
| --- | --- | --- | --- | --- |
| Hover Image Preview | https://21st.dev/community/components/avanishverma4/hover-image-preview | Awanish Verma / 21st | Community components documented as MIT; 21st preview media and metadata restricted by platform terms | Interaction anatomy only; no code or media copied |
| React Bits | https://github.com/DavidHDev/react-bits | David Haz | MIT + Commons Clause; may be used in products but not resold/redistributed as components | React dependency rejected |
| Codrops Menu Image Animation on Hover | https://tympanus.net/codrops/2020/07/01/creating-a-menu-image-animation-on-hover/ | Manoela Ilic / Codrops | Demo code MIT unless stated; demo imagery separately CC BY-NC-ND | Principle only; no code or imagery copied |
| Codrops Large Image to Content | https://tympanus.net/codrops/2022/08/03/large-image-to-content-page-transition/ | Manoela Ilic / Codrops | Demo code MIT unless stated; uses GSAP and Lenis | Deferred until project pages exist |
| Webflow split-screen scroll cloneable | https://webflow.com/made-in-webflow/website/intro-splitscreen-scroll-animation | Jonas Arleth | Cloneable within Webflow under platform/creator terms | Structural reference only |
| Webflow Interactive Sketch Portfolio | https://webflow.com/made-in-webflow/website/interactive-sketch-portfolio | Dhruv Sachdev | Cloneable within Webflow; uses sketch.js | Rejected as unrelated interaction |
| Sphere Portfolio HTML | https://onepagelove.com/sphere | Rob Hope / One Page Love | Free CC BY 3.0 with footer credit; $9 Pro removes credit | Hierarchy reference only |
| SwissBrut | https://onepagelove.com/swissbrut | Swiss Themes | Free Framer clone; Framer/platform terms apply | Typography reference only |
| Unmade | https://www.framer.com/community/marketplace/templates/unmade/ | Arian / Framer | Free, Framer Limited License | Editorial archive reference only |
| ThemeForest portfolio catalogue | https://themeforest.net/category/site-templates/creative/portfolio | Independent authors / Envato Market | Purchase and one-end-product Regular License required | Premium shortlist only |
| Cargo templates | https://cargo.site/templates | Cargo and template creators | Cargo platform/template terms apply | Feed/slideshow reference only |
| Readymag portfolio templates | https://readymag.com/templates/portfolio | Readymag and template creators | Free/paid, item-specific platform rights | Editorial reference/purchase shortlist |
| Craftwork | https://craftwork.design/license/ | Craftwork and marketplace creators | Commercial licence permits digital end use; redistribution forbidden; demos personal-only | No pack selected |
| UI8 portfolio assets | https://ui8.net/tags/portfolio | Independent UI8 creators | Exact product licence must be verified before use | Purchase shortlist only |
| Envato Elements portfolio templates | https://elements.envato.com/web-templates/portfolio | Independent authors / Envato | Active subscription and one registered licence per project/end use; redistribution forbidden | No item selected |
| Spline Community | https://docs.spline.design/basics/community-platform | Spline community creators | Community files CC0 1.0 | Deferred; no runtime or scene added |

## Compact catalogue research - not integrated

| Resource | URL | Relevant finding | Decision |
| --- | --- | --- | --- |
| Axel Born portfolio | https://axelvborn.github.io/ | Compact project art, factual metadata, and direct Steam/itch links | Reference for information density only |
| Quinn K / Postmodern Hellforest | https://quinnkdev.github.io/ | Small game entries include role context beside storefront links | Reference for role placement only |
| Robbie Goldberg portfolio | https://robbiegoldberg.github.io/portfolio/ | Artwork-led shipped-game tiles link directly to Steam | Reference for linked-capsule behavior only |
| Fumoku Labs | https://fumoku-labs.github.io/fumoku-labs/ | Compact cards distinguish studio projects from pre-studio work | Reference for UBER//DOSE context only |
| Finji games catalogue | https://finji.co/games/ | Dense image-led browsing with consistent game units | Reference for catalogue rhythm only |
| Free Lives games catalogue | https://freelives.net/games/ | Restrained art, short descriptions, and compact destination actions | Reference for row content only |
| Raw Fury games catalogue | https://rawfury.com/games/ | Compact owned catalogue rather than embedded storefront interfaces | Reference for catalogue structure only |
| Steam store widget documentation | https://partner.steamgames.com/doc/marketing/widget | Valve documents one configurable official storefront iframe | Remove the widget from the primary catalogue; keep a normal Steam link |
| Steam standard graphical assets | https://partner.steamgames.com/doc/store/assets/standard | Small Capsule is 462 × 174 and is intended for list/search contexts | Use its proportion as the local image system; no Steam artwork copied |
| Steam graphical asset rules | https://partner.steamgames.com/doc/store/assets/rules | Capsule art should identify the game and remain readable at small sizes | Inform future studio-supplied capsule exports |
| Nexira | https://www.framer.com/community/marketplace/templates/nexira/ | Framer CMS game-project hierarchy | Reference only; no platform migration or source reuse |
| Indiex | https://www.framer.com/community/marketplace/templates/67084/ | Framer one-page game-studio structure | Reference only; too large-media and effect-led |
| Strider | https://themeforest.net/item/strider-a-game-studio-template/21501326 | Paid Bootstrap game-studio HTML template | Rejected as overbuilt and visually broad; purchase would be required |
| Omero | https://themesparkle.com/item/omero-indie-games-studio-wordpress-theme/ | Paid WordPress/Elementor indie-studio theme | Rejected due to platform and plugin overhead |
| Gamefolio | https://portfolios.gumroad.com/l/gamefolio | Paid HTML/Astro gamified portfolio | Rejected as too gimmick-led for the studio direction |

## Premium/manual acquisition shortlist

1. **Anotte horizontal HTML template (ThemeForest):** purchase a Regular License only if the site later needs a full horizontal gallery system. Review bundled fonts and images separately.
2. **Readymag editorial template such as Origami or Poster Click:** use only inside Readymag after confirming the specific item's terms and platform migration implications.
3. **One exact Craftwork archival icon/type pack:** purchase/download only after the family is selected and its commercial licence is recorded here.
4. **UI8 portfolio or editorial pack:** do not purchase until the product page provides an authoritative licence suitable for a public portfolio.

No purchase or manual download is required for The Wet Index V1.
