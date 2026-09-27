/**
 * Renders the default Open Graph image (1200x630) with the bundled Chromium.
 *   node scripts/make-og.mjs
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

mkdirSync('public/og', { recursive: true });
const logo = readFileSync('src/assets/logo/logo-flat.png').toString('base64');
const art = readFileSync('src/assets/hero/hero-home.png').toString('base64');
const font = readFileSync(
  'node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2',
).toString('base64');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:PJS;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:200 800}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:PJS,system-ui,sans-serif}
.wrap{position:relative;width:1200px;height:630px;background:linear-gradient(135deg,#002352 0%,#0c3e52 100%);color:#fff}
.art{position:absolute;right:-40px;top:-40px;width:560px;height:710px;object-fit:cover;border-radius:40px;opacity:.9;box-shadow:0 40px 100px rgba(0,0,0,.4);transform:rotate(-6deg)}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,#002352 45%,rgba(0,35,82,.2) 75%,transparent)}
.logo{position:absolute;left:72px;top:64px;height:76px;background:#fff;padding:14px 22px;border-radius:18px}
h1{position:absolute;left:72px;top:230px;margin:0;font-size:78px;line-height:1.02;letter-spacing:-.03em;font-weight:800;max-width:640px}
p{position:absolute;left:72px;top:440px;margin:0;font-size:28px;line-height:1.35;color:#c9e7ee;max-width:600px;font-weight:500}
.bar{position:absolute;left:72px;bottom:56px;width:180px;height:8px;border-radius:4px;background:linear-gradient(90deg,#3fcfc4,#5fd39a)}
.tag{position:absolute;left:280px;bottom:48px;font-size:20px;letter-spacing:.18em;text-transform:uppercase;color:#9eede6;font-weight:600}
</style></head><body><div class="wrap">
<img class="art" src="data:image/png;base64,${art}" alt="">
<div class="fade"></div>
<img class="logo" src="data:image/png;base64,${logo}" alt="">
<h1>The Power of Partnership</h1>
<p>EPC and O&amp;M solutions for solar, storage and electrical infrastructure.</p>
<div class="bar"></div><div class="tag">axis-energyinc.com</div>
</div></body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const out = resolve('public/og/default.jpg');
await page.screenshot({ path: out, type: 'jpeg', quality: 86 });
await browser.close();
console.log('wrote', out);
