import type { ImageMetadata } from 'astro';

/** A LinkedIn post as the News page shows it: photo, headline or summary, date and link. */
export interface Post {
  id: string;
  /** The post on LinkedIn. */
  url: string;
  /** ISO date the post was published. */
  date: string;
  /** Headline when the post carries one (an article or document title). */
  title?: string;
  /** Plain-text opening of the post. */
  summary: string;
  /** A local image (static posts) or a remote URL (feeds), copied into the build. */
  image?: ImageMetadata | string;
  imageAlt?: string;
  sample: boolean;
  source: string;
}

export interface PostsResult {
  posts: Post[];
  source: string;
  /** Set when a remote source failed and the posts collection was used instead. */
  warning?: string;
}
