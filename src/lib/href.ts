/**
 * Base-aware URL helpers. Every internal link and every reference to a file in
 * /public must go through `href()` so the same code works on the GitHub Pages
 * project path (/Axis-Energy-Modern/) and on a custom domain (/).
 */
const rawBase = import.meta.env.BASE_URL || '/';
const BASE = rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');

const EXTERNAL = /^(https?:|mailto:|tel:|sms:|#|\/\/)/i;

export function href(path = '/'): string {
  if (EXTERNAL.test(path)) return path;
  const [beforeHash, hash] = path.split('#');
  const [pathname, query] = beforeHash.split('?');
  let clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const isFile = /\.[a-z0-9]{2,5}$/i.test(clean);
  if (!isFile && !clean.endsWith('/')) clean += '/';
  return `${BASE}${clean}${query ? `?${query}` : ''}${hash !== undefined ? `#${hash}` : ''}`;
}

/** Absolute URL (for canonical, Open Graph, JSON-LD). */
export function absoluteUrl(path: string, site: URL | undefined): string {
  const rel = href(path);
  if (!site) return rel;
  return new URL(rel, site).toString();
}

/** True when `current` (Astro.url.pathname) is the page for `path` or inside it. */
export function isActive(path: string, current: string, exact = false): boolean {
  const target = href(path).replace(/\/+$/, '');
  const cur = current.replace(/\/+$/, '');
  if (exact) return cur === target;
  if (target === BASE) return cur === target;
  return cur === target || cur.startsWith(`${target}/`);
}

export const base = BASE;
