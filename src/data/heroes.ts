/**
 * Header photos for the inner pages, in one place so the final hero photography can be
 * swapped in without touching the pages.
 *
 * Every entry is a placeholder for now: existing project photos standing in until Axis
 * chooses full-size hero images. Preview builds label them "Placeholder photo". To replace
 * one, add the new image under src/assets/heroes/ (2400 px wide or more), point the entry
 * at it and set `placeholder: false`.
 */
import type { ImageMetadata } from 'astro';
import cooperative from '@assets/projects/cooperative-solar-storage-portfolio.jpg';
import walnutGrove from '@assets/projects/walnut-grove-microgrid.jpg';
import wendell from '@assets/projects/wendell-campus-microgrid.jpg';

export interface HeroPhoto {
  src: ImageMetadata;
  /** CSS object-position for the crop, e.g. "50% 40%". */
  position?: string;
  /** True while the photo is a stand-in for hero photography still to be chosen. */
  placeholder: boolean;
}

const solarStorage: HeroPhoto = { src: cooperative, position: '50% 16%', placeholder: true };
const microgrid: HeroPhoto = { src: walnutGrove, position: '50% 20%', placeholder: true };
const carport: HeroPhoto = { src: wendell, position: '50% 36%', placeholder: true };

export const heroes = {
  services: solarStorage,
  'solar-epc': microgrid,
  'battery-storage-and-microgrids': carport,
  'electrical-infrastructure-and-commissioning': solarStorage,
  'om-and-technical-services': microgrid,
  omOffering: solarStorage,
  projects: microgrid,
  whyAxis: solarStorage,
  about: carport,
  leadership: microgrid,
  team: solarStorage,
  news: carport,
  article: carport,
  careers: microgrid,
  requestQuote: solarStorage,
  subcontractors: microgrid,
  contact: carport,
  notFound: solarStorage,
} satisfies Record<string, HeroPhoto>;

/** A project page's header uses that project's own photo when it has one. */
export function projectHero(image: ImageMetadata | undefined, position?: string): HeroPhoto {
  return image ? { src: image, position, placeholder: true } : heroes.projects;
}
