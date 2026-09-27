import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { company } from '@data/company';
import { href } from '@lib/href';

export async function GET(context: APIContext) {
  const posts = (await getCollection('news', ({ data }) => data.published)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: `${company.name} — News`,
    description: 'News, perspectives and updates from the Axis Energy team.',
    site: context.site ?? 'https://www.axis-energyinc.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      author: post.data.author,
      link: href(`/news/${post.id}/`),
      categories: [post.data.category],
    })),
    customData: '<language>en-us</language>',
  });
}
