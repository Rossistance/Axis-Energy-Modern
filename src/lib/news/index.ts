import { getCollection } from 'astro:content';
import { linkedinPosts, refreshAccessToken } from './linkedin';
import { jsonUrlPosts } from './json';
import type { Post, PostsResult } from './types';

export type { Post, PostsResult };

/** LinkedIn-Version sent when LINKEDIN_API_VERSION is unset; bump it about once a year. */
export const DEFAULT_LINKEDIN_VERSION = '202609';

function env(name: string): string | undefined {
  const v = (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

async function staticPosts(includeSamples: boolean): Promise<Post[]> {
  const entries = await getCollection('posts', ({ data }) => includeSamples || !data.sample);
  return entries
    .map((e) => ({
      id: e.id,
      url: e.data.url,
      date: e.data.date.toISOString(),
      title: e.data.title,
      summary: e.data.summary,
      image: e.data.image,
      imageAlt: e.data.imageAlt ?? '',
      sample: e.data.sample,
      source: 'static',
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Feed photos are copied into the build, and an image that cannot be downloaded would stop
 * it; such a post is shown without its photo instead.
 */
async function keepReachableImages(posts: Post[]): Promise<Post[]> {
  return Promise.all(
    posts.map(async (post) => {
      if (typeof post.image !== 'string') return post;
      try {
        const res = await fetch(post.image, { signal: AbortSignal.timeout(8000) });
        if (res.ok && (res.headers.get('content-type') ?? '').startsWith('image/')) return post;
      } catch {
        // fall through
      }
      console.warn(
        `[news] photo for ${post.url} could not be downloaded; showing the post without it.`,
      );
      return { ...post, image: undefined, imageAlt: undefined };
    }),
  );
}

async function linkedinToken(): Promise<string> {
  const refreshToken = env('LINKEDIN_REFRESH_TOKEN');
  const clientId = env('LINKEDIN_CLIENT_ID');
  const clientSecret = env('LINKEDIN_CLIENT_SECRET');
  if (refreshToken && clientId && clientSecret) {
    return refreshAccessToken({ refreshToken, clientId, clientSecret });
  }
  const token = env('LINKEDIN_ACCESS_TOKEN');
  if (!token) {
    throw new Error(
      'LINKEDIN_ACCESS_TOKEN (or LINKEDIN_REFRESH_TOKEN with LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET) is required',
    );
  }
  return token;
}

/**
 * News page posts, resolved at build time from the configured source.
 *   NEWS_SOURCE = static (default) | linkedin | json-url
 *   linkedin:  LINKEDIN_ORGANIZATION_ID, LINKEDIN_ACCESS_TOKEN (or the refresh-token trio),
 *              LINKEDIN_API_VERSION, LINKEDIN_INCLUDE_RESHARES=true to keep reposts
 *   json-url:  NEWS_URL
 *   NEWS_LIMIT = number of posts shown (default 9)
 * Remote failures never break the build: the posts collection is used and a warning is
 * returned so the preview can say so.
 */
export async function getPosts(): Promise<PostsResult> {
  const source = (env('NEWS_SOURCE') ?? 'static').toLowerCase();
  const preview = (env('PUBLIC_SITE_MODE') ?? 'preview') !== 'production';
  const limit = Math.max(1, Number(env('NEWS_LIMIT') ?? 9) || 9);
  if (source === 'static') {
    return { posts: (await staticPosts(preview)).slice(0, limit), source };
  }
  try {
    let posts: Post[];
    switch (source) {
      case 'linkedin': {
        const organization = env('LINKEDIN_ORGANIZATION_ID');
        if (!organization) throw new Error('LINKEDIN_ORGANIZATION_ID is required for linkedin');
        posts = await linkedinPosts({
          accessToken: await linkedinToken(),
          organization,
          version: env('LINKEDIN_API_VERSION') ?? DEFAULT_LINKEDIN_VERSION,
          includeReshares: env('LINKEDIN_INCLUDE_RESHARES') === 'true',
          limit,
        });
        break;
      }
      case 'json-url': {
        const url = env('NEWS_URL');
        if (!url) throw new Error('NEWS_URL is required for json-url');
        posts = await jsonUrlPosts(url);
        break;
      }
      default:
        throw new Error(`Unknown NEWS_SOURCE "${source}"`);
    }
    return { posts: await keepReachableImages(posts.slice(0, limit)), source };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `[news] ${source} feed failed (${message}); falling back to the posts collection.`,
    );
    return {
      posts: (await staticPosts(preview)).slice(0, limit),
      source: 'static',
      warning: message,
    };
  }
}
