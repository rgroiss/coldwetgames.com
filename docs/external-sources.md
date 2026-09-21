# External source log

## Original studio material

| Resource | Source / owner | Local use |
| --- | --- | --- |
| Mountain mark | User-provided, Cold and Wet Studios / Roman Groiss | Original transparent PNG in header and studio note |
| Roman Groiss portrait | User-provided, Roman Groiss | Existing JPEG; CSS monochrome treatment and responsive crop |
| YSIITU official header | [Studio Steam listing](https://store.steampowered.com/app/5017960/Your_Suffering_Is_Important_to_Us/) | Official 460 × 215 header, refreshed 2026-09-21; content-versioned HTML image and 3D texture |
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

## Texture pass, 2026-09-21

- **YSIITU lava:** `lava.mjs` ports the studio's own `Assets/_Hellgame/Art/Shaders/HellLavaBackground.hlsl` from the local Your Suffering Is Important To Us Unity project. The inspected source was at project commit `c1ec59cd`; the menu material supplies scale 3.2, speed 0.0247, warp 0.56 and softness 0.46. The website preserves the diagonal flow, five coupled folds and 28.6-second orange/red/purple cycle, with a brighter palette and stronger embers for the gallery. No Balatro game assets or third-party shader package were downloaded. The Unity project was read only.
- **Static lava:** `assets/textures/lava-still.png` is generated from the same fold equations and website palette at time 10. It is always available in CSS, including with JavaScript disabled, on mobile and after graphics failures.
- **Print grain and engraved lines:** `assets/textures/print-grain.png` and `contours.svg` are original deterministic procedural artwork created for this site. Generation code is in `scripts/generate-textures.mjs`; Node's standard library is the only requirement. CSS adds fine hatch/scan lines to selected surfaces.

The texture pass adds no external assets, dependencies, paid licences or services. These assets are studio material, not assets redistributed under an assumed third-party licence. Existing dependency licences above are unchanged.

## Steam capsule refresh, 2026-09-21

Downloaded the current `header_image` returned by Steam's public app-details API for app 5017960: [official image](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/5017960/f545cd3588af0e745367ecffd2b5555e03906435/header.jpg?t=1790026793). Stored unchanged as `assets/projects/ysiitu-steam-header-a04dc0e0.jpg` (SHA-256 `a04dc0e0fdf943c7e37cb7effd929c07c1376d0222e5c4dcff9aa6d93bcd05ce`). Both HTML placements and the 3D texture use this image. The previous hashed file remains available for visitors with cached older HTML.
