# Cold and Wet Studios website

Static portfolio for [coldwetgames.com](https://coldwetgames.com), hosted with GitHub Pages.

## Local preview

Serve the repository root with any static server. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validation

The validation script checks localization coverage, local file references, HTML class coverage, encoding artifacts, CSS brace balance, and the exact UBER//DOSE title:

```powershell
node scripts/validate-site.mjs
node --check localization.js
node --check steam-project.js
node --check scripts/sync-steam-project.mjs
```

The complete Steam-publication path can be tested safely against a known public
app without writing files:

```powershell
node scripts/sync-steam-project.mjs --probe 4235660 https://store.steampowered.com/app/4235660/Heavy_Wake/
```

## Automatic YSIITU Steam publication

The `Publish YSIITU Steam page` workflow checks Steam every 15 minutes until
app `5017960` becomes publicly accessible. It requires both public app data and
the customer-facing store page before it:

1. downloads the official Steam header into the repository;
2. marks `assets/steam/ysiitu.json` as published;
3. commits the public artwork and status to `main`; and
4. removes its own scheduled workflow so it stops consuming runs.

Until that happens, the website keeps the current development slate and does
not expose a Steam link. No repository secret or home computer is required.

## Publishing

In the repository's **Settings > Pages** section, choose **Deploy from a branch**, then select the `main` branch and `/ (root)`.

The `CNAME` file sets `coldwetgames.com` as the site's custom domain. DNS is managed separately through Porkbun.
