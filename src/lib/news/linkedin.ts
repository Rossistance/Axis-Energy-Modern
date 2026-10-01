/**
 * Posts from the Axis Energy LinkedIn page, read at build time with LinkedIn's Posts API
 * (Community Management API). Only posts the page itself publishes are kept: the finder
 * returns posts authored by the organization, so posts that merely tag Axis never appear,
 * and reposts, dark (ads-only) posts, drafts and non-public posts are dropped here.
 * https://learn.microsoft.com/linkedin/marketing/community-management/shares/posts-api
 */
import type { Post } from './types';
import { littleToPlain, headlineAndSummary, dropTrailingHashtags, truncate } from './text';

const API = 'https://api.linkedin.com/rest';
const TIMEOUT_MS = 10000;

export interface LinkedInConfig {
  accessToken: string;
  /** Numeric organization id, or the full urn:li:organization:… URN. */
  organization: string;
  /** LinkedIn-Version header, YYYYMM. Versions are supported for about a year. */
  version: string;
  /** Keep reposts (with or without Axis commentary). Off by default. */
  includeReshares: boolean;
  limit: number;
  fetch?: typeof fetch;
}

/** The parts of a Posts API element this adapter reads. */
export interface LinkedInPost {
  id: string;
  author: string;
  commentary?: string;
  createdAt?: number;
  publishedAt?: number;
  lifecycleState?: string;
  visibility?: string;
  distribution?: { feedDistribution?: string };
  reshareContext?: { parent?: string; root?: string };
  content?: {
    media?: { id?: string; title?: string; altText?: string };
    multiImage?: { images?: { id: string; altText?: string }[] };
    article?: { source?: string; thumbnail?: string; title?: string; description?: string };
  };
}

interface Asset {
  downloadUrl?: string;
  thumbnail?: string;
  status?: string;
}

export const organizationUrn = (org: string) =>
  org.startsWith('urn:') ? org : `urn:li:organization:${org.trim()}`;

/** Public link to a post. */
export const postUrl = (id: string) => `https://www.linkedin.com/feed/update/${id}/`;

/** True for a published, public, in-feed post the organization wrote itself. */
export function isOwnPost(p: LinkedInPost, author: string, includeReshares: boolean): boolean {
  return (
    p.author === author &&
    p.lifecycleState === 'PUBLISHED' &&
    p.visibility === 'PUBLIC' &&
    p.distribution?.feedDistribution !== 'NONE' &&
    (includeReshares || !p.reshareContext)
  );
}

/** The image or video asset URN that pictures the post, if any, with its alt text. */
export function mediaOf(p: LinkedInPost): { urn: string; alt?: string } | undefined {
  const media = p.content?.media;
  if (media?.id && /^urn:li:(image|video):/.test(media.id)) {
    return { urn: media.id, alt: media.altText };
  }
  const first = p.content?.multiImage?.images?.[0];
  if (first?.id) return { urn: first.id, alt: first.altText };
  const thumb = p.content?.article?.thumbnail;
  if (thumb) return { urn: thumb };
  return undefined;
}

/** Turns a Posts API element (and the resolved media URLs) into a card. */
export function toPost(p: LinkedInPost, mediaUrls: Record<string, string>): Post {
  const text = littleToPlain(p.commentary ?? '');
  const article = p.content?.article?.title;
  const media = mediaOf(p);
  let title: string | undefined;
  let summary: string;
  if (article) {
    title = truncate(article, 120);
    summary = truncate(dropTrailingHashtags(text), 180);
  } else {
    const parts = headlineAndSummary(text);
    title = parts.headline || undefined;
    summary = parts.summary;
  }
  const image = media ? mediaUrls[media.urn] : undefined;
  return {
    id: p.id,
    url: postUrl(p.id),
    date: new Date(p.publishedAt ?? p.createdAt ?? Date.now()).toISOString(),
    title: title || p.content?.media?.title || 'Axis Energy on LinkedIn',
    summary,
    image,
    imageAlt: image ? (media?.alt ?? '') : undefined,
    sample: false,
    source: 'linkedin',
  };
}

async function call<T>(cfg: LinkedInConfig, path: string, method: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await (cfg.fetch ?? fetch)(`${API}${path}`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${cfg.accessToken}`,
        'LinkedIn-Version': cfg.version,
        'X-Restli-Protocol-Version': '2.0.0',
        'X-RestLi-Method': method,
        accept: 'application/json',
      },
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`LinkedIn ${res.status} for ${path.split('?')[0]}: ${body.slice(0, 200)}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/** Download URLs for image and video URNs (images expire, so the build copies them). */
async function resolveMedia(cfg: LinkedInConfig, urns: string[]): Promise<Record<string, string>> {
  const urls: Record<string, string> = {};
  for (const kind of ['image', 'video'] as const) {
    const ids = [...new Set(urns.filter((u) => u.startsWith(`urn:li:${kind}:`)))];
    if (!ids.length) continue;
    const list = ids.map(encodeURIComponent).join(',');
    const data = await call<{ results?: Record<string, Asset> }>(
      cfg,
      `/${kind}s?ids=List(${list})`,
      'BATCH_GET',
    );
    for (const [urn, asset] of Object.entries(data.results ?? {})) {
      const url = kind === 'video' ? asset.thumbnail : asset.downloadUrl;
      if (url && (asset.status === undefined || asset.status === 'AVAILABLE')) urls[urn] = url;
    }
  }
  return urls;
}

export async function linkedinPosts(cfg: LinkedInConfig): Promise<Post[]> {
  const author = organizationUrn(cfg.organization);
  const data = await call<{ elements?: LinkedInPost[] }>(
    cfg,
    `/posts?author=${encodeURIComponent(author)}&q=author&count=50&sortBy=CREATED`,
    'FINDER',
  );
  const own = (data.elements ?? [])
    .filter((p) => isOwnPost(p, author, cfg.includeReshares))
    .slice(0, cfg.limit);
  const urns = own.map(mediaOf).flatMap((m) => (m ? [m.urn] : []));
  const mediaUrls = urns.length ? await resolveMedia(cfg, urns) : {};
  return own.map((p) => toPost(p, mediaUrls));
}

/**
 * Exchanges a refresh token for an access token, so the build keeps working after the
 * 60-day access token expires (refresh tokens are issued to approved LinkedIn apps).
 */
export async function refreshAccessToken(opts: {
  refreshToken: string;
  clientId: string;
  clientSecret: string;
  fetch?: typeof fetch;
}): Promise<string> {
  const res = await (opts.fetch ?? fetch)('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: opts.refreshToken,
      client_id: opts.clientId,
      client_secret: opts.clientSecret,
    }),
  });
  if (!res.ok) throw new Error(`LinkedIn token refresh failed: ${res.status}`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error('LinkedIn token refresh returned no access token');
  return json.access_token;
}
