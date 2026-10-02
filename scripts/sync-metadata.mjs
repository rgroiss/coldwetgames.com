import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

// Keep crawler/social-preview metadata in sync with the localisation source.
// Commit the result; hosting still needs no build step or JavaScript crawler.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const localization = readFileSync(resolve(root, "localization.js"), "utf8");
const dictionary = localization.match(/const locales = ([\s\S]+?);\r?\n\r?\n  const requestedLocale/);
if (!dictionary) throw new Error("Could not locate the locale dictionary.");
const { meta } = runInNewContext(`(${dictionary[1]})`).en;
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const path = resolve(root, "index.html");
const html = readFileSync(path, "utf8")
  .replace(/<title data-i18n="meta.title">[^<]*<\/title>/, `<title data-i18n="meta.title">${escape(meta.title)}</title>`)
  .replace(/<meta\b[^>]+data-i18n-attr="content:meta\.(title|description)"[^>]*>/g,
    (tag, key) => tag.replace(/content="[^"]*"/, `content="${escape(meta[key])}"`));
writeFileSync(path, html);
console.log("Static metadata synced from localization.js.");
