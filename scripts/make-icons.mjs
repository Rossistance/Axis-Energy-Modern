/**
 * Generates the favicon set from the flat brand logo (mark on the left of the lockup).
 *   node scripts/make-icons.mjs
 * Outputs: public/favicon.ico (PNG-in-ICO, 32px), favicon-32.png, apple-touch-icon.png (180),
 *          icon-192.png, icon-512.png and favicon.svg (vector approximation of the mark).
 */
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';

const SRC = 'src/assets/logo/logo-flat.png';
mkdirSync('public', { recursive: true });

const meta = await sharp(SRC).metadata();
// Find the mark's bounding box: scan alpha for the first fully transparent column gap after the mark.
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const colHas = new Array(info.width).fill(false);
for (let x = 0; x < info.width; x++) {
  for (let y = 0; y < info.height; y++) {
    if (data[(y * info.width + x) * 4 + 3] > 20) {
      colHas[x] = true;
      break;
    }
  }
}
// Group opaque column runs; the mark is everything before the first gap wider than 40px
// (the split circle itself has a narrow gap between its two halves).
const runs = [];
let x = 0;
while (x < info.width) {
  if (!colHas[x]) {
    x++;
    continue;
  }
  const s = x;
  while (x < info.width && colHas[x]) x++;
  runs.push([s, x]);
}
let start = runs[0][0];
let end = runs[0][1];
for (let i = 1; i < runs.length; i++) {
  if (runs[i][0] - end > 40) break;
  end = runs[i][1];
}
const left = Math.max(0, start - 4);
const width = Math.min(info.width - left, end - start + 8);
console.log(`mark bbox: x=${left} width=${width} of ${info.width}x${info.height}`);

const mark = sharp(SRC).extract({ left, top: 0, width, height: info.height ?? meta.height });
const markBuf = await mark.png().toBuffer();
const square = async (size, pad = 0.08, bg = { r: 0, g: 0, b: 0, alpha: 0 }) =>
  sharp(markBuf)
    .resize(Math.round(size * (1 - pad * 2)), Math.round(size * (1 - pad * 2)), {
      fit: 'contain',
      background: bg,
    })
    .extend({
      top: Math.round(size * pad),
      bottom: size - Math.round(size * (1 - pad * 2)) - Math.round(size * pad),
      left: Math.round(size * pad),
      right: size - Math.round(size * (1 - pad * 2)) - Math.round(size * pad),
      background: bg,
    })
    .png()
    .toBuffer();

const png32 = await square(32, 0.02);
writeFileSync('public/favicon-32.png', png32);
writeFileSync('public/icon-192.png', await square(192));
writeFileSync('public/icon-512.png', await square(512));
// Apple touch icons are opaque; use white.
writeFileSync(
  'public/apple-touch-icon.png',
  await square(180, 0.12, { r: 255, g: 255, b: 255, alpha: 1 }),
);

// ICO container holding one PNG image (supported by all modern browsers).
const ico = Buffer.alloc(6 + 16 + png32.length);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // type: icon
ico.writeUInt16LE(1, 4); // count
ico.writeUInt8(32, 6); // width
ico.writeUInt8(32, 7); // height
ico.writeUInt8(0, 8); // palette
ico.writeUInt8(0, 9); // reserved
ico.writeUInt16LE(1, 10); // planes
ico.writeUInt16LE(32, 12); // bpp
ico.writeUInt32LE(png32.length, 14); // size
ico.writeUInt32LE(22, 18); // offset
png32.copy(ico, 22);
writeFileSync('public/favicon.ico', ico);

// Vector approximation of the split-circle mark in brand colours.
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 4A28 28 0 0 0 32 60V46a14 14 0 0 1 0-28z" fill="#004b8d"/><path d="M32 4a28 28 0 0 1 0 56V46a14 14 0 0 0 0-28z" fill="#008752"/></svg>\n`,
);
console.log('icons written to public/');
