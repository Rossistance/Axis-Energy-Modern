/**
 * One-off helper used while building the site: the 2024 company overview deck
 * embeds site photos with a dark overlay baked in. This stretches the histogram
 * so they can be used in the "duotone" photo panels. Run from the repo root:
 *   node scripts/prepare-photos.mjs <file...>
 */
import sharp from 'sharp';
import { basename } from 'node:path';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/prepare-photos.mjs <jpg files>');
  process.exit(1);
}
for (const file of files) {
  const before = await sharp(file).stats();
  const buf = await sharp(file)
    .normalise({ lower: 1, upper: 99 })
    .gamma(1.15)
    .modulate({ brightness: 1.05 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  const after = await sharp(buf).stats();
  const mean = (s) => (s.channels.reduce((a, c) => a + c.mean, 0) / s.channels.length).toFixed(1);
  await sharp(buf).toFile(file + '.tmp');
  const { renameSync } = await import('node:fs');
  renameSync(file + '.tmp', file);
  console.log(basename(file), 'mean', mean(before), '->', mean(after), `${buf.length} bytes`);
}
