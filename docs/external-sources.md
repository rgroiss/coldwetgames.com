# External source log

## Original studio material

| Resource | Source / owner | Local use |
| --- | --- | --- |
| Mountain mark | User-provided, Cold and Wet Studios / Roman Groiss | Original transparent PNG in header and studio note |
| Roman Groiss portrait | User-provided, Roman Groiss | Existing JPEG; CSS monochrome treatment and responsive crop |
| YSIITU official header | [Studio Steam listing](https://store.steampowered.com/app/5017960/Your_Suffering_Is_Important_to_Us/) | Existing content-versioned 460 × 215 header, unchanged; HTML image and 3D texture |
| Heavy Wake environment | User-provided, Cold and Wet Studios | Existing forest artwork used as a large project background |
| Heavy Wake official header | [Studio Steam listing](https://store.steampowered.com/app/4235660/Heavy_Wake/) | Existing 460 × 215 capsule, unchanged |
| UBER//DOSE artwork | User-provided student-project material | Existing JPEG, unchanged; exact artwork credit remains unrecorded |
| Project facts and copy | Existing localisation dictionary and owner corrections | Preserved without factual additions |

## Locally hosted dependencies

| Dependency | Version / source | Licence / retained notice | Files |
| --- | --- | --- | --- |
| Three.js | 0.180.0, official npm distribution via unpkg | MIT; LICENSE retained | assets/vendor/three/three.module.min.js and three.core.min.js |
| GSAP + ScrollTrigger | 3.15.0, official npm distribution via unpkg | [GSAP standard licence](https://gsap.com/standard-license/); source licence headers retained | assets/vendor/gsap/gsap.min.js and ScrollTrigger.min.js |
| Barlow Condensed | Google Fonts v13, weight 800 | SIL Open Font License 1.1; BarlowCondensed-OFL.txt retained | Local Latin and Latin Extended WOFF2 |
| Space Grotesk | Google Fonts v22, variable weights 400–700 | SIL Open Font License 1.1; SpaceGrotesk-OFL.txt retained | Local Latin and Latin Extended WOFF2 |

Acquired for the local redesign on 2026-09-21. Three.js 0.180.0 was selected for its supplied minified browser builds; the imported core and module are from the same release. GSAP copyright and licence comments remain inside the vendored files.

Official font source repositories: [Barlow Condensed](https://github.com/google/fonts/tree/main/ofl/barlowcondensed), [Space Grotesk](https://github.com/google/fonts/tree/main/ofl/spacegrotesk). Binary files came from fonts.gstatic.com through the Google Fonts CSS API.

All runtime assets are served locally. No external template, component demo, stock photograph, invented game screenshot or generated game art is incorporated. The gallery layout and 3D exhibit are original code.

The older design-research documents remain historical research, not the current implementation specification.
