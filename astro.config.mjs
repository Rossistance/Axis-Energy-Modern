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
  // Legacy WordPress URLs. Emitted as meta-refresh pages in the static build;
  // hosting/ contains true 301 equivalents for each host. Destinations must
  // carry the base path themselves.
  redirects: Object.fromEntries(
    Object.entries({
      '/team/': '/leadership/',
      '/project/': '/projects/',
      '/category/general/': '/news/',
      '/project-category/general/': '/projects/',
      '/five-takeaways-from-a-nc-energy-policy-panel/':
        '/news/five-takeaways-from-a-nc-energy-policy-panel/',
      '/solar-could-provide-25-of-the-worlds-energy-by-2050/':
        '/news/solar-could-provide-25-of-the-worlds-energy-by-2050/',
    }).map(([from, to]) => [from, base === '/' ? to : `${base}${to}`]),
  ),
  vite: {
    build: { assetsInlineLimit: 2048 },
  },
});
