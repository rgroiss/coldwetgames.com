import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(repositoryRoot, path), "utf8");

const html = read("index.html");
const localization = read("localization.js");
const styles = read("styles.css");
const steamProject = read("steam-project.js");
const steamSync = read("scripts/sync-steam-project.mjs");
const steamStatus = JSON.parse(read("assets/steam/ysiitu.json"));
const errors = [];

const localeStart = localization.indexOf("const locales =");
const localeEnd = localization.indexOf("\n\n  const requestedLocale");

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
  if (!existsSync(resolve(repositoryRoot, reference))) {
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
