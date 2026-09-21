import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(repositoryRoot, path), "utf8");

const html = read("index.html");
const localization = read("localization.js");
const styles = read("styles.css");
const gallery = read("gallery.js");
const scene = read("scene.mjs");
const lava = read("lava.mjs");
const steamProject = read("steam-project.js");
const steamSync = read("scripts/sync-steam-project.mjs");
const steamStatus = JSON.parse(read("assets/steam/ysiitu.json"));
const errors = [];

const localeStart = localization.indexOf("const locales =");
const localeEndMatch = /\r?\n\r?\n  const requestedLocale/.exec(localization);
const localeEnd = localeEndMatch?.index ?? -1;

if (localeStart === -1 || localeEnd === -1) {
  errors.push("Could not locate the locale dictionary in localization.js.");
}

let messages = {};

if (errors.length === 0) {
  const assignmentStart = localization.indexOf("=", localeStart) + 1;
  const objectLiteral = localization
    .slice(assignmentStart, localeEnd)
    .trim()
    .replace(/;$/, "");

  messages = runInNewContext(`(${objectLiteral})`).en;
}

const messageFor = (path) =>
  path.split(".").reduce((value, key) => value?.[key], messages);

const textKeys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(
  ([, key]) => key,
);
const attributeKeys = [
  ...html.matchAll(/data-i18n-attr="([^"]+)"/g),
].flatMap(([, definitions]) =>
  definitions
    .split(",")
    .map((definition) =>
      definition.slice(definition.indexOf(":") + 1).trim(),
    ),
);
const localizationKeys = [...new Set([...textKeys, ...attributeKeys])];

localizationKeys.forEach((key) => {
  const value = messageFor(key);

  if (typeof value !== "string" || value.trim() === "") {
    errors.push(`Missing or empty localization value: ${key}`);
  }
});

const directText = html
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

if (directText) {
  errors.push(`Found visible HTML text outside localization: "${directText}"`);
}

const localReferences = [
  ...html.matchAll(/(?:href|src)="([^"]+)"/g),
  ...html.matchAll(/data-steam-status="([^"]+)"/g),
  ...styles.matchAll(/url\("([^"]+)"\)/g),
  ...gallery.matchAll(/import\('([^']+)'\)/g),
  ...scene.matchAll(/from '([^']+)'/g),
]
  .map(([, reference]) => reference)
  .filter(
    (reference) =>
      !reference.startsWith("#") &&
      !reference.startsWith("http://") &&
      !reference.startsWith("https://") &&
      !reference.startsWith("mailto:"),
  );

localReferences.forEach((reference) => {
  if (!existsSync(resolve(repositoryRoot, reference.split(/[?#]/)[0]))) {
    errors.push(`Missing local file referenced by index.html: ${reference}`);
  }
});

const htmlClasses = [
  ...new Set(
    [...html.matchAll(/class="([^"]+)"/g)].flatMap(([, classNames]) =>
      classNames.split(/\s+/).filter(Boolean),
    ),
  ),
];

htmlClasses.forEach((className) => {
  if (!styles.includes(`.${className}`)) {
    errors.push(`HTML class has no CSS selector: ${className}`);
  }
});

const replacementArtifacts = /(?:Â|Ã|â€|ï¿½)/;

[
  ["index.html", html],
  ["localization.js", localization],
  ["steam-project.js", steamProject],
  ["scripts/sync-steam-project.mjs", steamSync],
  ["styles.css", styles],
  ["gallery.js", gallery],
  ["scene.mjs", scene],
  ["lava.mjs", lava],
].forEach(([path, contents]) => {
  if (replacementArtifacts.test(contents)) {
    errors.push(`Possible text-encoding artifact in ${path}.`);
  }
});

const braceDifference =
  [...styles].filter((character) => character === "{").length -
  [...styles].filter((character) => character === "}").length;

if (braceDifference !== 0) {
  errors.push("Unbalanced braces in styles.css.");
}

if (messageFor("projects.uberDose.title") !== "UBER//DOSE") {
  errors.push("The UBER//DOSE title is not using its exact official spelling.");
}

// Structural contracts: effects must never become the only route to content.
for (const id of ["work", "about", "contact"]) {
  if (!html.includes(`id="${id}"`)) errors.push(`Missing public section anchor: ${id}`);
}
for (const key of [
  "projects.yourSuffering.description", "projects.yourSuffering.steamState",
  "projects.heavyWake.description", "projects.heavyWake.state",
  "projects.uberDose.description", "projects.uberDose.role", "projects.uberDose.context",
  "hero.status", "about.intro", "footer.email",
]) {
  if (!textKeys.includes(key)) errors.push(`Required portfolio information is not displayed: ${key}`);
}
const projectTitles = [...html.matchAll(/<h3[^>]+data-i18n="([^"]+)"/g)].map(([, key]) => key);
if (projectTitles.join(",") !== "projects.yourSuffering.title,projects.heavyWake.title,projects.uberDose.title") {
  errors.push("Game order or accessible project titles have changed.");
}
if (!html.includes('aria-pressed="false"') || !attributeKeys.includes("motion.label")) {
  errors.push("Motion control must expose a localised accessible name and its state.");
}
for (const key of ["motion.label", "motion.on", "motion.off", "motion.hint", "hero.drag"]) {
  if (!localizationKeys.includes(key)) errors.push(`Missing localised interaction label: ${key}`);
}
if (!html.includes('<canvas class="art-stage__canvas" aria-hidden="true"')) {
  errors.push("Decorative canvas must be excluded from the accessibility tree.");
}
if ([...html.matchAll(/<canvas\b([^>]*)>/g)].some(([, attributes]) => !attributes.includes('aria-hidden="true"'))) {
  errors.push("All decorative canvases must be hidden from assistive technology.");
}
for (const asset of ["lava-still.png", "print-grain.png"]) {
  const file = resolve(repositoryRoot, "assets/textures", asset);
  if (!existsSync(file)) { errors.push(`Missing static texture fallback: ${asset}`); continue; }
  const data = readFileSync(file);
  if (data.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") errors.push(`Invalid PNG texture: ${asset}`);
}
for (const asset of [
  "assets/vendor/three/three.core.min.js", "assets/vendor/three/LICENSE",
  "assets/fonts/BarlowCondensed-OFL.txt", "assets/fonts/SpaceGrotesk-OFL.txt",
]) {
  if (!existsSync(resolve(repositoryRoot, asset))) errors.push(`Missing dependency or licence: ${asset}`);
}
const wishlistLinks = [...html.matchAll(/href="(https:\/\/store\.steampowered\.com\/app\/5017960\/[^\"]+)"/g)];
if (wishlistLinks.length < 2 || wishlistLinks.some(([, href]) =>
  new URL(href).search !== "?utm_source=coldwetgames&utm_medium=website&utm_campaign=ysiitu_wishlist&utm_content=project_card"
)) errors.push("The YSIITU wishlist destination or tracking parameters have changed.");

if (
  steamStatus.appId !== 5017960 ||
  steamStatus.storeUrl !==
    "https://store.steampowered.com/app/5017960/Your_Suffering_Is_Important_to_Us/"
) {
  errors.push("The YSIITU Steam publication configuration is incorrect.");
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Site validation passed: ${localizationKeys.length} localized keys, ${localReferences.length} local references, and ${htmlClasses.length} HTML classes checked.`,
  );
}
