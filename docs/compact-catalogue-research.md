# Compact game catalogue research

Research completed on 28 July 2026 for the next Cold and Wet Studios layout pass.

> **Implementation adjustment:** after the compact index was reviewed, the
> shared capsule ratio was changed to 460:215 so the official Heavy Wake Steam
> header could be used at native proportions and UBER//DOSE could gain vertical
> breathing room without cropping.

## Outcome

The best fit is an original **compact release index**, not another large project
showcase and not a purchased game-site theme. Each game should be one concise,
horizontal record built around a small Steam-capsule-shaped image, project
context, one sentence of copy, and a direct destination link.

This direction solves the current layout problem in three ways:

1. all three titles can be understood within roughly one desktop viewport;
2. artwork identifies a game without dominating the page;
3. project context stays explicit, particularly the distinction between studio
   releases and UBER//DOSE as pre-studio student work.

## Portfolio references

These are real developer or studio portfolios, rather than generic gaming themes.

| Reference | Relevant pattern | Lesson for Cold and Wet Studios |
| --- | --- | --- |
| [Axel Born](https://axelvborn.github.io/) | Small project imagery sits beside release date, platforms, genres, a short description, and direct Steam/itch links. | Keep factual project context adjacent to the image; Steam is a destination rather than an embedded layout. |
| [Quinn K / Postmodern Hellforest](https://quinnkdev.github.io/) | Compact game entries pair art, a short description, storefront links, and explicit roles. | Roman's role and each project's origin can remain visible without a case-study-sized card. |
| [Robbie Goldberg](https://robbiegoldberg.github.io/portfolio/) | Shipped-game tiles use artwork as the principal link and expose supporting information without a large text block. | Make the capsule or row clickable while retaining a clearly labelled text link for accessibility. |
| [Fumoku Labs](https://fumoku-labs.github.io/fumoku-labs/) | Compact project cards distinguish studio work from games made before the studio. | This directly supports presenting UBER//DOSE in chronology while labelling it as earlier work. |
| [Finji](https://finji.co/games/) | A dense image-led catalogue lets cover art do most of the browsing work. | Repetition and consistent image proportions are useful; oversized alternating compositions are not required. |
| [Free Lives](https://freelives.net/games/) | Each title has restrained art, a short description, and a small “More” or purchase action. | One concise sentence and one primary action are enough at catalogue level. |
| [Raw Fury](https://rawfury.com/games/) | A broad archive uses compact cover/title units rather than embedding storefront interfaces. | The project index should remain an owned studio surface, not look like a stack of third-party widgets. |
| [Erik di Biase](https://erikdibiase.com/) | Selected work pairs media with role/technology tags and direct storefront links. | A small metadata line can carry status, role, and platform without turning into decorative badges. |

### Shared pattern

Across the useful examples, the common solution is:

- project-owned image or capsule;
- title and release state;
- role or project context;
- one short description;
- normal Steam/itch link.

Embedded Steam widgets are unusual in the primary portfolio index. They are
useful as a purchase utility, but visually they give Valve control over the
layout, typography, image crop, and amount of space.

## Steam-specific findings

Valve provides one official [store widget](https://partner.steamgames.com/doc/marketing/widget)
whose selectable purchase option and store data update automatically. There is
not a second, more visual official iframe format suitable for a portfolio.

Valve's [standard graphical asset documentation](https://partner.steamgames.com/doc/store/assets/standard)
defines a **Small Capsule** at 462 × 174 pixels. Steam uses it in list and search
contexts, so its approximately 2.66:1 proportion is a strong, familiar model for
a compact game index. Valve's [graphical asset rules](https://partner.steamgames.com/doc/store/assets/rules)
also reinforce that capsule art should identify the game cleanly and keep its
logo readable at small sizes.

For this site:

- use the Small Capsule proportion as a layout system, not copied Steam chrome;
- remove the Heavy Wake iframe from the primary list;
- link the Heavy Wake record directly to Steam;
- use an approved high-resolution project image cropped locally, or replace it
  later with the official 462 × 174 Steamworks asset supplied by the studio;
- do not enlarge a scraped store thumbnail.

## Reusable template review

| Template | Technology and licence | Fit |
| --- | --- | --- |
| [Nexira](https://www.framer.com/community/marketplace/templates/nexira/) | Framer CMS; Framer Marketplace Limited License | Good content hierarchy and project detail pages, but cinematic and large-media-first. It would require a platform migration. |
| [Indiex](https://www.framer.com/community/marketplace/templates/67084/) | Framer; Framer Marketplace Limited License | Designed for a game studio, but still relies on large trailers, visual effects, and Framer-specific CMS behavior. |
| [Strider](https://themeforest.net/item/strider-a-game-studio-template/21501326) | Paid HTML/Bootstrap template; Envato Regular License for one end product | The most technically portable candidate, but it carries many pages and a broad “gaming” visual language the current site does not need. |
| [Omero](https://themesparkle.com/item/omero-indie-games-studio-wordpress-theme/) | Paid WordPress/Elementor theme | Relevant indie-studio sections, but introduces WordPress, Elementor, plugins, and hosting overhead for a three-project static site. |
| [Gamefolio](https://portfolios.gumroad.com/l/gamefolio) | Paid HTML and Astro versions | Memorable, but its side-scrolling pixel-platformer concept is more gimmicky than the requested elegant studio identity. |
| [Gamewebsite](https://webflow.com/templates/html/gamewebsite-game-website-template) | Webflow template; platform-specific single-use terms | Intended for one game rather than a multi-project studio archive. |

### Template decision

No reviewed template is a clean enough fit to justify a purchase, new dependency,
or platform migration. The useful patterns are simple enough to implement
originally in the current HTML/CSS architecture. No template code or media should
be copied.

## Layout options

### A. Compact release index — recommended

Each project is a horizontal row:

```text
01  [ small capsule ]  Your Suffering Is Important to Us  [In development]
                       One concise sentence.              Project details →
```

- Desktop: numbered row, 220–280 px capsule, flexible text column, compact
  metadata/action column.
- Tablet: capsule remains beside the copy but metadata moves below the title.
- Mobile: capsule spans the row, with title and action immediately below.
- Visual treatment: flat page surface, thin separators or spacing only, nearly
  square corners, one restrained hover/focus response.
- Strength: least template-like, clearest chronology, and best place for context.

### B. Three-up capsule grid

Three compact cards sit in one desktop row, with the capsule above the title and
metadata.

- Strength: all three games are visible immediately and the layout feels close
  to a curated storefront shelf.
- Weakness: grids of equal cards are more generic, and the long YSIITU title
  becomes harder to balance.

### C. Studio work plus earlier work

Use the same compact rows as option A, but insert a small “Earlier work” heading
before UBER//DOSE.

- Strength: the studio/pre-studio distinction becomes unmistakable.
- Weakness: with only three games, a second formal section may feel heavier than
  a simple context label inside the UBER//DOSE row.

The recommendation is **A**, with an “Earlier student work” context label on the
UBER//DOSE record rather than a separate section.

## Proposed V1 structure

1. Keep the masthead and work-in-progress notice, but reduce the hero's vertical
   footprint so projects appear earlier.
2. Replace the current oversized project records and Steam iframe with three
   compact release rows, newest first:
   - **Your Suffering Is Important to Us** — in development; small typographic
     capsule until approved art exists.
   - **Heavy Wake** — released; cropped project art and a direct Steam link.
   - **UBER//DOSE** — earlier student project; supplied art, Roman credited as
     main developer, and a direct itch.io link.
3. Keep each description to one visible sentence. Put secondary facts on one
   plain metadata line rather than inside multiple badges.
4. Make the full row respond to hover/focus, but retain an explicit labelled
   storefront link for keyboard and screen-reader clarity.
5. Keep the about section after the index and reduce the gap between the archive
   and biography.

## Interaction and visual constraints

- No embedded storefront widget in the primary index.
- No parallax, shared sticky preview, carousel, or scroll-triggered image swap.
- No oversized rounded rectangles or glassmorphism.
- Capsule images use one consistent 462:174-style ratio.
- Hover/focus may shift the capsule a few pixels, raise contrast, and change one
  title accent; reduced-motion mode removes movement.
- Mobile must have no horizontal scroll and no hover-dependent information.
- Every new visible label and string must be added to `localization.js` and bound
  through the existing `data-i18n` system.

## Asset follow-up

The first compact pass can use existing repository assets. For the strongest
final result, export the official Heavy Wake Small Capsule from Steamworks and
create a matching YSIITU capsule once its visual identity is approved. Both
should be provided at 462 × 174 or a clean integer multiple such as 924 × 348.
