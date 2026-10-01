import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const PROJECT_TYPES = [
  'utility',
  'commercial',
  'municipal',
  'carport',
  'microgrid',
  'community',
  'rooftop',
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Display override for location, e.g. "Various, NC" for a portfolio. */
      location: z.string().optional(),
      city: z.string().optional(),
      state: z.string().length(2),
      sizeMwdc: z.number().positive(),
      sites: z.number().int().positive().optional(),
      year: z.number().int().optional(),
      /** "2016-02", "2021-12-22" or "2024" */
      commissioned: z.string().optional(),
      type: z.enum(PROJECT_TYPES),
      role: z.array(z.string()).default(['EPC']),
      mount: z.string().optional(),
      modules: z.string().optional(),
      storageMwh: z.number().optional(),
      storageBrand: z.string().optional(),
      partners: z.array(z.string()).optional(),
      summary: z.string(),
      /** Outcome, shown in the Impact callout. */
      impact: z.string().optional(),
      /** Case-study detail (all optional): the problem Axis had to solve and how it was solved. */
      challenge: z.string().optional(),
      approach: z.string().optional(),
      /** Axis Energy's scope of work, one line per item. */
      scope: z.array(z.string()).optional(),
      /** Why the project matters to owners: short titled points. */
      benefits: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageCredit: z.string().optional(),
      /** Town-centre location for the unlabelled pin on the home page footprint map. */
      coordinates: z.object({ lat: z.number(), lon: z.number() }).optional(),
      /** Focal point when the photo is cropped (home carousel), as a CSS object-position such as "35% 50%". */
      imageFocus: z.string().optional(),
      /** Additional site photos, shown beside the project details. */
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional() }))
        .optional(),
      featured: z.boolean().default(false),
      /** Unpublished entries are excluded from every page and the sitemap. */
      published: z.boolean().default(false),
      source: z.string(),
      order: z.number().optional(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      email: z.email().optional(),
      linkedin: z.url().optional(),
      phone: z.string().optional(),
      photo: image().optional(),
      photoAlt: z.string().optional(),
      summary: z.string(),
      education: z.array(z.string()).optional(),
      credentials: z.array(z.string()).optional(),
      order: z.number().default(99),
      published: z.boolean().default(true),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      author: z.string(),
      category: z.string().default('General'),
      excerpt: z.string(),
      sources: z.array(z.object({ label: z.string(), url: z.url() })).optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Original WordPress path, kept for redirects. */
      legacyPath: z.string().optional(),
      published: z.boolean().default(true),
    }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    type: z.string().default('Full-time'),
    department: z.string().optional(),
    posted: z.coerce.date(),
    applyUrl: z.url().optional(),
    applyEmail: z.email().optional(),
    summary: z.string(),
    /** Sample listings only render in preview mode, with a "Sample" badge. */
    sample: z.boolean().default(false),
  }),
});

export const collections = { projects, team, news, jobs };
