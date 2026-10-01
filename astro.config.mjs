// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

/**
 * SITE_URL  – canonical origin (no trailing slash).
 * SITE_BASE – path the site is served from. "/Axis-Energy-Modern" on GitHub Pages,
 *             "/" on a custom domain. Both default to the GitHub Pages project site.
 */
const siteUrl = (process.env.SITE_URL ?? 'https://rossistance.github.io').replace(/\/+$/, '');
const rawBase = process.env.SITE_BASE ?? '/Axis-Energy-Modern';
const base =
  rawBase.trim() === '' || rawBase.trim() === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site: siteUrl,
  base,
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
    }),
    icon(),
  ],
  // LinkedIn post photos (News page) are downloaded at build time and served from the
  // site, because LinkedIn's image links expire.
  image: {
    remotePatterns: [{ protocol: 'https', hostname: '**.licdn.com' }],
  },
  // Legacy WordPress URLs and pages that moved. Emitted as meta-refresh pages in the
  // static build; hosting/ contains true 301 equivalents for each host. Destinations
  // must carry the base path themselves.
  redirects: Object.fromEntries(
    Object.entries({
      '/team/': '/about/leadership/',
      '/leadership/': '/about/leadership/',
      '/project/': '/projects/',
      '/category/general/': '/news/',
      '/project-category/general/': '/projects/',
      // The 2018 articles were retired when News became the LinkedIn feed (2026-10-01).
      '/five-takeaways-from-a-nc-energy-policy-panel/': '/news/',
      '/solar-could-provide-25-of-the-worlds-energy-by-2050/': '/news/',
      '/news/five-takeaways-from-a-nc-energy-policy-panel/': '/news/',
      '/news/solar-could-provide-25-of-the-worlds-energy-by-2050/': '/news/',
      // Request a Quote and Subcontractors moved under Work with Axis (2026-10-01).
      '/request-a-quote/': '/work-with-axis/developer-project-owner/',
      '/subcontractors/': '/work-with-axis/subcontractor/',
    }).map(([from, to]) => [from, base === '/' ? to : `${base}${to}`]),
  ),
  vite: {
    build: { assetsInlineLimit: 2048 },
  },
});
