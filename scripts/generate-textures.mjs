// Original, deterministic print grain and engraved contours; no external assets.
// The lava still is a CPU port of the studio's HellLavaBackground.hlsl,
// matching lava.mjs at time=10. Run only when regenerating committed assets.
import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../assets/textures/', import.meta.url));
mkdirSync(output, { recursive: true });
const fract = x => x - Math.floor(x);
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, v) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
function hash(x, y) {
  let a = fract(x * .1031), b = fract(y * .1031), c = a;
  const d = a * (b + 33.33) + b * (c + 33.33) + c * (a + 33.33);
  a += d; b += d; c += d;
  return fract((a + b) * c);
}
function noise(x, y) {
  const a = Math.floor(x), b = Math.floor(y), u = smooth(0, 1, fract(x)), v = smooth(0, 1, fract(y));
  return mix(mix(hash(a, b), hash(a + 1, b), u), mix(hash(a, b + 1), hash(a + 1, b + 1), u), v);
}
function lava(u, v, aspect) {
  const time = 10, motion = time * .0247 * 12, diagonal = Math.hypot(aspect, 1);
  const bx = (u - .5) * aspect / diagonal, by = (v - .5) / diagonal;
  let x = bx + Math.sin(by * 7 + motion * .19) * mix(.015, .07, .56);
  let y = by + Math.sin(bx * 5.2 - motion * .14) * mix(.012, .057, .56);
  const angle = -.43 + Math.sin(motion * .03) * .025;
  [x, y] = [(x * Math.cos(angle) - y * Math.sin(angle)) * 29.48, (x * Math.sin(angle) + y * Math.cos(angle)) * 29.48];
  let cx = x + y, cy = cx;
  for (let i = 0; i < 5; i++) {
    const phase = i * 1.21, crest = Math.sin(Math.max(x, y) * .93 + phase * .12);
    cx += x + crest; cy += y + crest;
    x += .4008 * Math.cos(4.73 + cy * .39 + motion * .86 + phase * .07);
    y += .4008 * Math.sin(cx * .94 - motion * .71 - phase * .05);
    const fold = Math.cos(x + y + phase * .03) - Math.sin(x * .69 - y - phase * .04);
    x -= fold * .7888; y -= fold * .7888;
  }
  let paint = Math.min(2, Math.hypot(x, y) * .036 * 2.546);
  paint += (noise(bx * 45 + motion * .07, by * 45 - motion * .05) - .5) * mix(.012, .04, .46);
  const edge = mix(.012, .067, .46), pool = 1 - smooth(.08 - edge, .34 + edge, paint);
  const ember = smooth(.52 - edge, .68 + edge, paint) * (1 - smooth(.9 - edge, 1.08 + edge, paint));
  const base = [.12, .035, .075], poolColor = [.32, .08, .16];
  const red = [.7, .12, .2], purple = [.56, .27, .72];
  return base.map((channel, i) => mix(mix(channel, poolColor[i], pool), mix(red[i], purple[i], smooth(0, 1, .05)), ember * .82) * 255);
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type), length = Buffer.alloc(4), crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, crc]);
}
function png(name, width, height, pixel) {
  const rows = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const rgba = pixel(x, y);
    for (let c = 0; c < 4; c++) rows[y * (width * 4 + 1) + 1 + x * 4 + c] = Math.round(rgba[c]);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  writeFileSync(output + name, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
}

png('lava-still.png', 960, 600, (x, y) => [...lava((x + .5) / 960, 1 - (y + .5) / 600, 1.6), 255]);
png('print-grain.png', 256, 256, (x, y) => {
  const value = hash(x + 71, y + 97), speck = value > .54 ? 255 : 0;
  return [speck, speck, speck, Math.abs(value - .5) * 25];
});

const lines = [];
for (let band = 0; band < 64; band++) {
  const points = [];
  for (let x = -40; x <= 1000; x += 8) {
    const y = band * 14 - 120 + Math.sin(x / 165 + band * .074) * 56 + Math.sin(x / 75 - band * .045) * 18;
    points.push(`${points.length ? 'L' : 'M'}${x},${y.toFixed(2)}`);
  }
  lines.push(`<path d="${points.join(' ')}"/>`);
}
writeFileSync(output + 'contours.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" fill="none" stroke="#b69af7" stroke-opacity=".42" stroke-width=".7">${lines.join('')}</svg>\n`);
console.log('Generated lava still, print grain and engraved contours.');
