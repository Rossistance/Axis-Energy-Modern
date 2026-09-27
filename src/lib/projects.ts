import { getCollection, type CollectionEntry } from 'astro:content';

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
