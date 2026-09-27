import type { APIContext } from 'astro';
import { href } from '@lib/href';

export function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') ?? '';
  const preview = (import.meta.env.PUBLIC_SITE_MODE ?? 'preview') !== 'production';
  const body = [
    'User-agent: *',
    // Preview builds should not be indexed while the WordPress site is still live.
    preview ? 'Disallow: /' : 'Allow: /',
    `Sitemap: ${site}${href('/sitemap-index.xml')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
