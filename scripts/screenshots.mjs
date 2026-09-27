/**
 * Full-page screenshots of every sitemap route at phone, tablet and desktop widths.
 *   npx astro preview &  then  node scripts/screenshots.mjs [outDir]
 */
import { chromium } from '@playwright/test';
import { readFileSync, mkdirSync } from 'node:fs';

const out = process.argv[2] ?? 'tests/__screenshots__';
mkdirSync(out, { recursive: true });
const rawBase = process.env.SITE_BASE ?? '/Axis-Energy-Modern';
const base = rawBase === '/' || rawBase === '' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const origin = process.env.PREVIEW_ORIGIN ?? 'http://localhost:4321';
const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
const paths = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => new URL(m[1]).pathname);
const widths = [390, 768, 1440];
const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  for (const p of paths) {
    const name = (p.replace(base, '') || 'home').replace(/\/$/, '').replace(/\//g, '_') || 'home';
    await page.goto(`${origin}${p}`, { waitUntil: 'networkidle' });
    await page.evaluate(() =>
      document
        .querySelectorAll('[data-reveal],[data-reveal-group]')
        .forEach((el) => el.classList.add('is-visible')),
    );
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${name}@${w}.png`, fullPage: true });
    console.log(`${name}@${w}`);
  }
  await ctx.close();
}
await browser.close();
