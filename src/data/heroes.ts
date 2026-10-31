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
import hertfordFields from '@assets/heroes/hertford-fields.jpg';
import hollySpringsRooftop from '@assets/heroes/holly-springs-rooftop.jpg';
import yadkinville from '@assets/projects/yadkinville-solar.jpg';

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

/* Chosen heroes: two of the options Axis sent on 2026-10-22, and the Yadkinville rebuild
   that leads the O&M page (2026-10-28). */
const allFields: HeroPhoto = { src: hertfordFields, position: '50% 30%', placeholder: false };
const rooftop: HeroPhoto = { src: hollySpringsRooftop, position: '50% 55%', placeholder: false };
const rebuild: HeroPhoto = { src: yadkinville, position: '50% 45%', placeholder: false };

export const heroes = {
  services: solarStorage,
  'solar-epc': microgrid,
  'battery-storage-and-microgrids': carport,
  'electrical-infrastructure-and-commissioning': solarStorage,
  'om-and-technical-services': rebuild,
  projects: allFields,
  markets: rooftop,
  whyAxis: solarStorage,
  about: carport,
  leadership: microgrid,
  team: solarStorage,
  news: carport,
  article: carport,
  careers: microgrid,
  workWithAxis: carport,
  projectRequest: solarStorage,
  subcontractor: microgrid,
  contact: carport,
  notFound: solarStorage,
} satisfies Record<string, HeroPhoto>;
