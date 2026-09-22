# Experimental game gallery

## Intent

An expressive studio portfolio with Your Suffering Is Important to Us in the spotlight. Preserve every existing project fact, ordering, storefront destination, tracking parameter, biography detail and contact address. The 2026 experimental-gallery brief supersedes the earlier Wet Index and compact-catalogue visual restrictions.

## Identity and typography

- Charcoal #111113, warm white #f2f0e7, violet #b69af7 and acid green #d2ff5a.
- Original purple mountain mark, unchanged.
- Barlow Condensed 800 for large uppercase titles; Space Grotesk 400–700 for body copy, navigation and metadata.
- Fonts are local WOFF2 files with Latin and Latin Extended coverage, display swap and system fallbacks.
- Asymmetric composition and large changes in scale provide the identity; square project panels hold the actual game content.

## Page composition

1. Compact navigation and a persistent motion preference control.
2. Oversized studio typography, existing introduction, and a YSIITU exhibit. The wishlist action appears in the first desktop viewport.
3. Newest-first game gallery: flowing red/ember YSIITU feature, violet Heavy Wake forest illustration, and dark neon UBER//DOSE composition. Artwork remains paired with each game's description, facts and action.
4. Violet about section with the original photograph and existing biography. The site-in-progress notice is retained here.
5. Large contact link, email and copyright.

The studio name remains a single accessible heading. Text embedded in original game artwork is not used as a substitute for HTML project titles.

## Texture and material

- The YSIITU exhibit sits over a rectangular lava field that echoes its equipment frame. The larger project panel uses the same effect across its background, with a dark red veil beneath the copy.
- Port the game's own five-fold lava algorithm; preserve its slow internal evolution and orange/red/violet ember cycle. Website colours are brighter than the gameplay background. Do not replace it with unrelated stock lava imagery.
- Fine deterministic grain gives the charcoal and violet panels a print finish. Subtle scan lines belong only to the neon section; generic contour waves and rings are omitted.
- Keep textures behind text, never over official artwork. Colored controls retain print grain without diagonal hatching. Texture contrast must stay subordinate to reading and focus indicators.
- Decoration is restrained: Lucide's Files icon beside the introduction and an outlined Steam stamp reference office paperwork. Use the original third-party SVG, tinted violet with CSS; its ISC licence is retained locally. No starbursts, orbit rings, glowing status dots or floating stickers. Project metadata is plain text; the motion control has square corners consistent with the other controls.
- All texture files are local, with a reproducible standard-library Node generator. No runtime SVG filters, texture libraries or new external assets are required.

## Motion

- GSAP handles a short, unstaggered opening movement and restrained one-time section entrances. Elements remain visible in base CSS. Hover feedback uses color, borders or brightness without lifting controls or zooming artwork.
- Heavy Wake's background has a bounded scroll-linked depth effect on fine-pointer desktops.
- Native scrolling and normal anchors remain intact.
- Three.js renders one framed artwork panel with reflective edges, small hardware details and pointer-responsive lighting and tilt. The panel does not bob or wobble on its own.
- Mouse drag rotates the panel within a bounded range. The canvas is decorative and not a keyboard destination. All meaningful actions remain adjacent HTML links.
- The localised motion toggle pauses GSAP effects, rendering, hover transitions and smooth scrolling. The preference survives reloads when localStorage is available.
- Reduced-motion preferences override the saved setting and disable the toggle. No scene is loaded in this state.
- Rendering stops while offscreen or when the document is hidden. Cap pixel ratio at 1.5; avoid post-processing and large models.
- Context loss restores static artwork immediately. Context restoration resumes the scene. Failed imports and texture loads leave the static artwork intact.
- Lava imports independently from the Three.js exhibit and GSAP. Two decorative WebGL fields render at a maximum of 24 fps and 768 × 480 pixels each, without multiplying device pixel ratio. Each pauses independently offscreen and while the tab is hidden. Mobile/coarse-pointer devices and initial reduced-motion states use a committed lava still with no lava renderer. Toggling motion off freezes already-loaded fields; context loss immediately reveals the CSS still.

## Responsive and accessible behaviour

- Below 761px, use a single-column composition and static artwork; navigation uses a clear second row.
- Coarse-pointer devices also retain static artwork.
- Keep official artwork at its original proportions, without cropping titles.
- Visible focus outlines, a skip link and public work/about/contact anchors are required.
- Canvas content is hidden from assistive technology; its HTML image alternative remains available.
- Every visible string, including interaction instructions and accessible names, uses the existing localisation system.
- No gameplay, dates, roles, technologies or achievements are invented.

## Architecture

Plain HTML/CSS, a localised content dictionary, a small interaction controller, and a lazily imported 3D module. Optional visual dependencies must not gate content or navigation. GitHub Pages serves the same repository-root site with no build step. Keep library versions and font licences in the source log.
