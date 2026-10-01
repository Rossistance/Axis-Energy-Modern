import { test, expect } from '@playwright/test';
import { littleToPlain, headlineAndSummary } from '../src/lib/news/text';
import {
  isOwnPost,
  linkedinPosts,
  refreshAccessToken,
  type LinkedInPost,
} from '../src/lib/news/linkedin';
import { fromFeed } from '../src/lib/news/json';

/**
 * The News feed adapters, against recorded shapes of LinkedIn's Posts, Images and Videos
 * APIs (no network). Only posts the Axis page publishes may come through.
 */

const ORG = 'urn:li:organization:123';
const post = (over: Partial<LinkedInPost>): LinkedInPost => ({
  id: 'urn:li:share:1',
  author: ORG,
  commentary: 'Hello',
  lifecycleState: 'PUBLISHED',
  visibility: 'PUBLIC',
  distribution: { feedDistribution: 'MAIN_FEED' },
  publishedAt: Date.UTC(2026, 8, 15),
  ...over,
});

test('little text: mentions, hashtags and escapes become plain text', () => {
  expect(
    littleToPlain(
      'Proud to build with @[Devtestco](urn:li:organization:2414183) {hashtag|\\#|solar} \\(phase 2\\)',
    ),
  ).toBe('Proud to build with Devtestco #solar (phase 2)');
});

test('the headline is the first sentence and closing hashtags are dropped', () => {
  expect(
    headlineAndSummary(
      'Walnut Grove is live! The microgrid islanded on day one.\n\n#solar #storage',
    ),
  ).toEqual({ headline: 'Walnut Grove is live!', summary: 'The microgrid islanded on day one.' });
});

test('only published, public, in-feed posts the page wrote itself are kept', () => {
  expect(isOwnPost(post({}), ORG, false)).toBe(true);
  expect(isOwnPost(post({ author: 'urn:li:person:9' }), ORG, false)).toBe(false);
  expect(isOwnPost(post({ reshareContext: { parent: 'urn:li:share:2' } }), ORG, false)).toBe(false);
  expect(isOwnPost(post({ reshareContext: { parent: 'urn:li:share:2' } }), ORG, true)).toBe(true);
  expect(isOwnPost(post({ distribution: { feedDistribution: 'NONE' } }), ORG, false)).toBe(false);
  expect(isOwnPost(post({ lifecycleState: 'DRAFT' }), ORG, false)).toBe(false);
  expect(isOwnPost(post({ visibility: 'CONNECTIONS' }), ORG, false)).toBe(false);
});

test('the LinkedIn adapter reads the page posts, resolves their photos and links each post', async () => {
  const calls: { url: string; headers: Record<string, string> }[] = [];
  const fake: typeof fetch = async (input, init) => {
    const url = String(input);
    calls.push({ url, headers: (init?.headers ?? {}) as Record<string, string> });
    if (url.includes('/rest/posts?')) {
      return Response.json({
        elements: [
          post({
            id: 'urn:li:share:1',
            commentary: 'Commissioning complete at Walnut Grove. Next up: O&M.',
            content: { media: { id: 'urn:li:image:A', altText: 'Battery yard' } },
          }),
          post({ id: 'urn:li:share:2', reshareContext: { parent: 'urn:li:share:9' } }),
          post({
            id: 'urn:li:ugcPost:3',
            commentary: 'Read our story',
            content: {
              article: {
                title: 'Axis named a Top Solar Contractor',
                thumbnail: 'urn:li:image:B',
                source: 'https://example.com/story',
              },
            },
          }),
          post({ id: 'urn:li:share:4', distribution: { feedDistribution: 'NONE' } }),
          post({
            id: 'urn:li:share:5',
            commentary: 'Site walk',
            content: { media: { id: 'urn:li:video:V' } },
          }),
        ],
      });
    }
    if (url.includes('/rest/images?')) {
      return Response.json({
        results: {
          'urn:li:image:A': { downloadUrl: 'https://media.licdn.com/a.jpg', status: 'AVAILABLE' },
          'urn:li:image:B': { downloadUrl: 'https://media.licdn.com/b.jpg', status: 'AVAILABLE' },
        },
      });
    }
    if (url.includes('/rest/videos?')) {
      return Response.json({
        results: { 'urn:li:video:V': { thumbnail: 'https://media.licdn.com/v.jpg' } },
      });
    }
    return new Response('not found', { status: 404 });
  };

  const posts = await linkedinPosts({
    accessToken: 'token',
    organization: '123',
    version: '202609',
    includeReshares: false,
    limit: 9,
    fetch: fake,
  });

  expect(posts.map((p) => p.id)).toEqual(['urn:li:share:1', 'urn:li:ugcPost:3', 'urn:li:share:5']);
  expect(posts[0]).toMatchObject({
    url: 'https://www.linkedin.com/feed/update/urn:li:share:1/',
    title: 'Commissioning complete at Walnut Grove.',
    summary: 'Next up: O&M.',
    image: 'https://media.licdn.com/a.jpg',
    imageAlt: 'Battery yard',
    date: '2026-09-15T00:00:00.000Z',
  });
  expect(posts[1]).toMatchObject({
    title: 'Axis named a Top Solar Contractor',
    summary: 'Read our story',
    image: 'https://media.licdn.com/b.jpg',
  });
  expect(posts[2].image).toBe('https://media.licdn.com/v.jpg');

  const finder = calls[0];
  expect(finder.url).toContain('author=urn%3Ali%3Aorganization%3A123');
  expect(finder.url).toContain('q=author');
  expect(finder.headers.Authorization).toBe('Bearer token');
  expect(finder.headers['LinkedIn-Version']).toBe('202609');
  expect(finder.headers['X-Restli-Protocol-Version']).toBe('2.0.0');
});

test('a LinkedIn error is reported, not hidden', async () => {
  const fake: typeof fetch = async () =>
    new Response('{"message":"Expired access token"}', { status: 401 });
  await expect(
    linkedinPosts({
      accessToken: 'old',
      organization: '1',
      version: '202609',
      includeReshares: false,
      limit: 9,
      fetch: fake,
    }),
  ).rejects.toThrow(/LinkedIn 401/);
});

test('a refresh token is exchanged for a new access token', async () => {
  let body = '';
  const fake: typeof fetch = async (_input, init) => {
    body = String(init?.body);
    return Response.json({ access_token: 'fresh' });
  };
  expect(
    await refreshAccessToken({ refreshToken: 'r', clientId: 'c', clientSecret: 's', fetch: fake }),
  ).toBe('fresh');
  expect(body).toContain('grant_type=refresh_token');
});

test('a JSON feed is normalized and incomplete items are skipped', () => {
  const posts = fromFeed([
    {
      url: 'https://www.linkedin.com/feed/update/urn:li:share:7/',
      date: '2026-09-01',
      text: 'Hello from the field. More to come.',
    },
    { url: 'https://example.com/no-date' },
  ]);
  expect(posts).toHaveLength(1);
  expect(posts[0]).toMatchObject({ title: 'Hello from the field.', summary: 'More to come.' });
});
