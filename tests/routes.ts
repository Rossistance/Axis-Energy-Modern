import { readFileSync } from 'node:fs';

/** Every URL from the generated sitemap, as paths relative to the site base. */
export function sitemapPaths(): string[] {
  const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1]);
  return locs.map((loc) => {
    const url = new URL(loc);
    const rawBase = process.env.SITE_BASE ?? '/Axis-Energy-Modern';
    const base = rawBase === '/' || rawBase === '' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
    return url.pathname.startsWith(base)
      ? url.pathname.slice(base.length)
      : url.pathname.replace(/^\//, '');
  });
}
