import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const statusPath = resolve(repositoryRoot, "assets/steam/ysiitu.json");
const workflowPath = resolve(
  repositoryRoot,
  ".github/workflows/sync-steam-page.yml",
);
const configuredStatus = JSON.parse(readFileSync(statusPath, "utf8"));
const probeIndex = process.argv.indexOf("--probe");
const probeAppId = probeIndex >= 0 ? Number(process.argv[probeIndex + 1]) : null;
const probeStoreUrl = probeIndex >= 0 ? process.argv[probeIndex + 2] : null;
const isProbe =
  Number.isInteger(probeAppId) &&
  probeAppId > 0 &&
  typeof probeStoreUrl === "string" &&
  probeStoreUrl.startsWith("https://store.steampowered.com/app/");
const status = isProbe
  ? {
      ...configuredStatus,
      appId: probeAppId,
      published: false,
      storeUrl: probeStoreUrl,
    }
  : configuredStatus;
const appId = String(status.appId);
const userAgent =
  "ColdWetGamesWebsite/1.0 (+https://coldwetgames.com; contact@coldwetgames.com)";

if (status.published === true) {
  console.log("The Steam page has already been published.");
  process.exit(0);
}

const request = (url) =>
  fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": userAgent,
    },
  });

const detailsResponse = await request(
  `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=en`,
);

if (!detailsResponse.ok) {
  throw new Error(`Steam app-details request failed: ${detailsResponse.status}`);
}

const detailsPayload = await detailsResponse.json();
const app = detailsPayload[appId];

if (app?.success !== true) {
  console.log("The Steam app is not public yet.");
  process.exit(0);
}

const pageResponse = await request(status.storeUrl);

if (!pageResponse.ok) {
  throw new Error(`Steam store-page request failed: ${pageResponse.status}`);
}

const pageHtml = await pageResponse.text();
const hasPublicStorePage =
  /<div[^>]+class="apphub_AppName"[^>]*>/i.test(pageHtml) ||
  /<title>[^<]+ on Steam<\/title>/i.test(pageHtml);

if (!hasPublicStorePage) {
  console.log("Steam data exists, but the customer-facing page is not public yet.");
  process.exit(0);
}

if (
  typeof app.data?.header_image !== "string" ||
  typeof app.data?.name !== "string"
) {
  throw new Error("Steam returned incomplete public app data.");
}

const imageResponse = await request(app.data.header_image);

if (!imageResponse.ok) {
  throw new Error(`Steam artwork request failed: ${imageResponse.status}`);
}

const contentType = imageResponse.headers.get("content-type") ?? "";
const imageBytes = Buffer.from(await imageResponse.arrayBuffer());

if (!contentType.startsWith("image/") || imageBytes.length < 10_000) {
  throw new Error("Steam returned an invalid header image.");
}

if (isProbe) {
  console.log(
    `Publication probe passed for ${app.data.name} (${imageBytes.length} image bytes).`,
  );
  process.exit(0);
}

const imagePath = resolve(repositoryRoot, status.imagePath);
mkdirSync(dirname(imagePath), { recursive: true });
writeFileSync(imagePath, imageBytes);

writeFileSync(
  statusPath,
  `${JSON.stringify(
    {
      ...status,
      published: true,
      detectedAt: new Date().toISOString(),
      steamName: app.data.name,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

if (existsSync(workflowPath)) {
  rmSync(workflowPath);
}

console.log(`Published Steam page detected for ${app.data.name}.`);
