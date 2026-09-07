# The Wet Index design system

## Intent

The site is a working field index for a game developer and studio. The interface should help visitors move between projects; visual identity comes from the studio mark, real game art, editorial typography, and deliberate spacing. It must not resemble a product dashboard or a generic animated portfolio template.

## Design tokens

```css
:root {
  --ink: #0b0c0e;
  --ink-soft: #17191c;
  --paper: #f1efe8;
  --muted: #aaa9a3;
  --quiet: #74767a;
  --turquoise: #68e6d1;
  --violet: #a68af4;
  --violet-deep: #2a1747;
  --gutter: clamp(1.25rem, 5vw, 5rem);
  --content-width: 93.75rem;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Typography

- **Studio display:** Arial/Helvetica system sans at 800 weight for `Cold and Wet`; Georgia italic for `Studios`. The contrast is editorial, not decorative.
- **Project titles:** Arial/Helvetica at 650-700 weight, responsive from roughly `2.15rem` to `3.35rem`, line-height `1.1-1.12`. Descenders must never collide.
- **Section titles:** responsive from roughly `2.8rem` to `6.5rem`, line-height `1.02`.
- **Body:** Arial/Helvetica at `1-1.18rem`, line-height `1.5-1.65`.
- **Metadata:** `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace; `0.68-0.76rem`, uppercase, `0.08-0.12em` tracking.
- No hosted font is required. This avoids a render delay and external dependency.

## Layout

- **Maximum page width:** 1500px.
- **Page gutter:** `clamp(1.25rem, 5vw, 5rem)`.
- **Mental grid:** 12 columns.
- **Intro:** roughly 8 columns for the title and 4 for statement/mark.
- **Catalogue:** each desktop record uses four compact fields: project number, 460:215 capsule, title/description, and facts/destination.
- **Record rhythm:** all three games should be understandable within roughly one desktop viewport. Records remain unboxed and are separated by deliberate spacing rather than ornamental lines.
- **About:** 7 columns copy and 5 columns portrait photography.

## Breakpoints

- **1080px:** move facts below the main copy while keeping the capsule beside it.
- **832px:** stack each capsule below its title and keep facts directly beneath the capsule.
- **576px:** compact header/navigation, reduce display scale, and tighten factual metadata.

## Colour rules

- Warm near-black is the continuous page field.
- Paper white carries primary type; dim paper and quiet grey carry description and metadata.
- Turquoise signals current/live/interactive states.
- Violet belongs to the studio identity and the YSIITU development slate.
- No gradients, glowing fields, glass surfaces, or decorative blobs.

## Borders, corners, and shadows

- Corners are square.
- Avoid card borders and ornamental rules. Separation comes from compact rhythm, whitespace, and the capsule edges.
- Focus outlines are the only strong outline treatment.
- No box shadows. If future photography disappears into the background, use a one-pixel contrast edge only.

## Images

- Use supplied project art without mockup frames.
- Every project owns a small capsule using the official Heavy Wake Steam header's 460:215 proportion.
- Heavy Wake uses its official 460 × 215 Steam artwork at or below native size and links directly to Steam.
- UBER//DOSE uses the supplied title artwork with `object-fit: contain` so its lettering remains legible.
- YSIITU uses a locally mirrored official Steam header and links directly to its public Steam page. The image URL carries a content version so artwork updates bypass stale browser and CDN caches.
- Roman's supplied portrait uses a responsive 4:5 crop with a restrained 8% scale-in; the source photograph remains compositionally intact.
- Lazy-load project images and the portrait.

## Icon and link rules

- Do not introduce a generic icon library.
- External-link direction is a small CSS-drawn corner/arrow, not a Unicode character embedded in styles.
- Text remains visible; icons never replace labels.

## Project-art behavior

- Every project image remains attached to its own record at every breakpoint.
- Desktop uses a horizontal release index: number, capsule, copy, then facts/link.
- Mobile places the same capsule directly after the project heading.
- Linked artwork receives only a restrained lift, brightness change, and `2.5%` image scale response.
- There is no scroll-controlled image switching, sticky shared preview, or dependency on interaction JavaScript.

## Focus and keyboard behavior

- All links receive a two-pixel turquoise outline with at least four pixels of offset.
- Project artwork links and text links retain visible labels and receive the same turquoise focus outline.
- The skip link targets the work catalogue.
- External links use `target="_blank"` with `rel="noreferrer"` and descriptive localised accessible names.

## Reduced motion

- Under `prefers-reduced-motion: reduce`, the small media scale transition becomes effectively instant.
- No parallax, pointer-following logo, automatic marquee, or scroll hijacking is allowed.

## Content rules

- All visible strings and accessibility labels are routed through `localization.js`.
- Do not invent roles, technologies, dates, or production claims.
- Distinguish studio releases from Roman's pre-studio work.
- Future case-study modules should be added only when approved screenshots, trailers, contribution notes, and links exist.
