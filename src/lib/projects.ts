import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { formatSize, formatStorage, stateName } from './format';

export type Project = CollectionEntry<'projects'>;

export const TYPE_LABELS: Record<Project['data']['type'], string> = {
  utility: 'Utility-scale',
  commercial: 'Commercial & industrial',
  municipal: 'Municipal & government',
  carport: 'Carport & canopy',
  microgrid: 'Microgrid',
  community: 'Community solar',
  rooftop: 'Rooftop',
};

export async function getPublishedProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => data.published);
  return all.sort((a, b) => {
    const ao = a.data.order ?? 999;
    const bo = b.data.order ?? 999;
    if (ao !== bo) return ao - bo;
    return (b.data.year ?? 0) - (a.data.year ?? 0) || b.data.sizeMwdc - a.data.sizeMwdc;
  });
}

export function projectLocation(p: Project): string {
  if (p.data.location) return p.data.location;
  return [p.data.city, p.data.state].filter(Boolean).join(', ');
}

export function portfolioTotals(projects: Project[]) {
  const mwdc = projects.reduce((s, p) => s + p.data.sizeMwdc, 0);
  const mwh = projects.reduce((s, p) => s + (p.data.storageMwh ?? 0), 0);
  const states = new Set(projects.map((p) => p.data.state));
  const sites = projects.reduce((s, p) => s + (p.data.sites ?? 1), 0);
  return { count: projects.length, mwdc, mwh, states: [...states].sort(), sites };
}

export interface CarouselSlide {
  image: ImageMetadata;
  alt: string;
  title: string;
  meta?: string;
  href: string;
  /** CSS object-position for the crop, e.g. "35% 50%". */
  focus?: string;
}

/**
 * Photos for the home page carousel, in project order. Only photos at least `minWidth`
 * pixels wide are used, so the large hero frame never shows an enlarged, soft image;
 * replacing a small photo with its original (same file name) adds that project
 * automatically. If no photo is that wide, every project photo is used instead.
 */
export function carouselSlides(
  projects: Project[],
  { minWidth = 1000, max = 6 }: { minWidth?: number; max?: number } = {},
): CarouselSlide[] {
  const withPhotos = projects.filter((p) => p.data.image);
  const sharp = withPhotos.filter((p) => p.data.image!.width >= minWidth);
  return (sharp.length > 0 ? sharp : withPhotos).slice(0, max).map((p) => {
    const storage = formatStorage(p.data.storageMwh);
    const place =
      p.data.sites && p.data.sites > 1
        ? `${p.data.sites} sites in ${stateName(p.data.state)}`
        : projectLocation(p);
    return {
      image: p.data.image!,
      alt: p.data.imageAlt ?? p.data.title,
      title: p.data.title,
      meta: [formatSize(p.data.sizeMwdc), storage && `${storage} storage`, place]
        .filter(Boolean)
        .join(' · '),
      href: `/project/${p.id}/`,
      focus: p.data.imageFocus,
    };
  });
}
