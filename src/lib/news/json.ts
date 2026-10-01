/**
 * Posts from any JSON feed (NEWS_SOURCE=json-url), for a social-media aggregator or an
 * automation that exports the LinkedIn page's posts. Expects an array, or { posts: [] },
 * of { url, date, title?, summary | text, image?, imageAlt? }.
 */
import type { Post } from './types';
import { headlineAndSummary, truncate } from './text';

const TIMEOUT_MS = 8000;

interface FeedItem {
  id?: string;
  url?: string;
  link?: string;
  date?: string;
  title?: string;
  summary?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
}

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined;

export function fromFeed(items: FeedItem[]): Post[] {
  return items.flatMap((item, i) => {
    const url = str(item.url) ?? str(item.link);
    const date = str(item.date);
    if (!url || !date || Number.isNaN(Date.parse(date))) return [];
    const text = str(item.summary) ?? str(item.text) ?? '';
    const parts = headlineAndSummary(text);
    const title = str(item.title);
    return [
      {
        id: str(item.id) ?? `feed-${i}`,
        url,
        date: new Date(date).toISOString(),
        title: title ? truncate(title, 120) : parts.headline || undefined,
        summary: title ? truncate(text, 180) : parts.summary,
        image: str(item.image),
        imageAlt: str(item.imageAlt) ?? '',
        sample: false,
        source: 'json-url',
      },
    ];
  });
}

export async function jsonUrlPosts(url: string, doFetch: typeof fetch = fetch): Promise<Post[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await doFetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url}`);
    const data = (await res.json()) as FeedItem[] | { posts?: FeedItem[] };
    return fromFeed(Array.isArray(data) ? data : (data.posts ?? []));
  } finally {
    clearTimeout(timer);
  }
}
