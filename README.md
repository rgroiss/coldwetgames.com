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
```

## Publishing

In the repository's **Settings > Pages** section, choose **Deploy from a branch**, then select the `main` branch and `/ (root)`.

The `CNAME` file sets `coldwetgames.com` as the site's custom domain. DNS is managed separately through Porkbun.
