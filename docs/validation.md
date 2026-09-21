# Local redesign review — 2026-09-21

## Automated checks

- Site validator passes: 67 localised keys, 22 local asset references, 74 HTML classes.
- JavaScript syntax checks pass for localisation, gallery controller, 3D scene, preview server and validator.
- Whitespace diff check passes.
- Compared against HEAD: every previously displayed localisation key is still used, and every original dictionary value is unchanged.
- Preserved all external destinations, YSIITU tracking parameters, project order and public section anchors.

## Browser review

Reviewed in the Chromium-based Codex browser at widths of 320, 390, 768, 1280 and 1440 pixels. No horizontal page overflow or empty localisation bindings. All eight HTML images loaded. The YSIITU wishlist action remains within the first desktop viewport. Inspected each project, portrait, contact section and the narrow mobile layout.

Verified the keyboard skip link, visible focus, anchor navigation, keyboard activation of the motion control, saved motion preference across reloads and bounded mouse rotation of the exhibit. The ordinary site produced no browser warnings or errors.

Tested desktop zoom-equivalent reflow at a 640 × 400 CSS viewport (half of 1280 × 800): no overflow or clipped headings. Native browser 200% zoom was not available through the embedded browser controls; this is a reflow test, not a claim of a native zoom test.

Primary text/background contrast ratios range from 5.56:1 to 16.34:1. Raised the opacity of small project-fact labels and gave the drag instruction an opaque background so their contrast is not dependent on the artwork.

## Failure and preference scenarios

A local, ignored preview harness loaded the actual site with isolated browser capability overrides:

| Scenario | Result |
| --- | --- |
| Reduced motion | Motion off, control disabled, no 3D scene loaded, static art retained |
| WebGL unavailable | Static art retained; scene unavailable; instruction hidden |
| GSAP and ScrollTrigger absent | All content visible; normal navigation and 3D exhibit still work |
| localStorage blocked | Site and motion controls initialise normally |
| WebGL context lost | Static art restored; interaction and instruction disabled |

Every scenario retained all three project headings, all seven storefront links, zero empty text bindings and no horizontal overflow. The harness and screenshots are in the ignored .preview directory and are not part of the deployed website.

## Delivery

Local review used the no-cache server on port 8001. Desktop and mobile screenshots are stored in .preview. The redesign was reviewed locally on codex/experimental-game-gallery before the studio owner approved publication.

## Texture iteration — 2026-09-21

Reviewed locally on `codex/textured-gallery`; the studio owner approved this texture iteration for publication on 2026-09-21.

- Validator passes: 67 localised keys, 32 local references, 77 HTML classes, including decorative canvas semantics and PNG fallback signatures. Syntax checks pass for the updated controller/scene, new lava renderer and texture generator. Whitespace checks pass. The localisation dictionary and every existing content binding and destination are unchanged.
- Inspected the hero, YSIITU lava feature, Heavy Wake, neon project and portrait textures. Responsive checks at 320, 390, 768, 1280 and 1440 CSS pixels showed no horizontal overflow or empty text. All eight content images loaded. The wishlist button remains in the first 1280 × 800 desktop viewport.
- Rechecked 640 × 400 CSS-pixel reflow as the 200%-zoom equivalent; native embedded-browser zoom remains unavailable. Mobile uses the static texture and HTML exhibit, without a running lava renderer.
- Verified the motion switch freezes both lava fields and the artwork; the saved off preference survives reload. Offscreen fields stop independently. A simulated document-hidden event in the ignored harness stops both lava fields.
- Tested reduced motion, unavailable WebGL, lava shader compilation failure, lava context loss and restoration, and missing GSAP/ScrollTrigger. All retained three project headings, seven storefront links, no empty localisations and no overflow. Shader failure and lava context loss leave the separate 3D artwork operational. Restoring the lava context resumes rendering.
- Increased the weakest red backdrop veil to 33% opacity. A conservative calculation using each ember palette endpoint, maximum ember weighting, brighter pool colour, maximum shader dither and white grain bounds gives at least 5.07:1 for the YSIITU paragraph colour. The left copy area and bottom metadata have additional darkening.
- Screenshots and the scenario results are in ignored `.preview/textures-desktop.png`, `.preview/textures-mobile.png`, `.preview/textures-ysiitu.png` and `.preview/texture-qa-results.json`.

No Unity files, unrelated `README.txt`, external storefront URLs, factual copy, deployment settings or dependency versions were changed.
