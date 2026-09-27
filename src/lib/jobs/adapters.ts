import type { Job } from './types';

const TIMEOUT_MS = 8000;

async function getJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

const text = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined;

/** Greenhouse Job Board API: https://developers.greenhouse.io/job-board.html */
export async function greenhouse(board: string): Promise<Job[]> {
  type GH = {
    jobs: {
      id: number;
      title: string;
      absolute_url: string;
      updated_at?: string;
      location?: { name?: string };
      departments?: { name: string }[];
    }[];
  };
  const data = await getJson<GH>(
    `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(board)}/jobs`,
  );
  return data.jobs.map((j) => ({
    id: `gh-${j.id}`,
    title: j.title,
    location: text(j.location?.name) ?? 'See posting',
    department: j.departments?.[0]?.name,
    posted: j.updated_at,
    applyUrl: j.absolute_url,
    sample: false,
    source: 'greenhouse',
  }));
}

/** Lever Postings API: https://github.com/lever/postings-api */
export async function lever(site: string): Promise<Job[]> {
  type LV = {
    id: string;
    text: string;
    hostedUrl: string;
    createdAt?: number;
    categories?: { location?: string; team?: string; commitment?: string };
  }[];
  const data = await getJson<LV>(
    `https://api.lever.co/v0/postings/${encodeURIComponent(site)}?mode=json`,
  );
  return data.map((j) => ({
    id: `lever-${j.id}`,
    title: j.text,
    location: text(j.categories?.location) ?? 'See posting',
    department: j.categories?.team,
    type: j.categories?.commitment,
    posted: j.createdAt ? new Date(j.createdAt).toISOString() : undefined,
    applyUrl: j.hostedUrl,
    sample: false,
    source: 'lever',
  }));
}

/** Workable widget API: https://workable.readme.io/reference/jobs */
export async function workable(subdomain: string): Promise<Job[]> {
  type WK = {
    jobs: {
      shortcode: string;
      title: string;
      url: string;
      city?: string;
      state?: string;
      country?: string;
      department?: string;
      published_on?: string;
      employment_type?: string;
    }[];
  };
  const data = await getJson<WK>(
    `https://apply.workable.com/api/v1/widget/accounts/${encodeURIComponent(subdomain)}`,
  );
  return data.jobs.map((j) => ({
    id: `wk-${j.shortcode}`,
    title: j.title,
    location: [j.city, j.state, j.country].filter(Boolean).join(', ') || 'See posting',
    department: j.department,
    type: j.employment_type,
    posted: j.published_on,
    applyUrl: j.url,
    sample: false,
    source: 'workable',
  }));
}

/** BambooHR public careers list: https://<subdomain>.bamboohr.com/careers/list */
export async function bamboohr(subdomain: string): Promise<Job[]> {
  type BH = {
    result: {
      id: number | string;
      jobOpeningName: string;
      location?: { city?: string; state?: string };
      departmentLabel?: string;
      employmentStatusLabel?: string;
      datePosted?: string;
    }[];
  };
  const host = `https://${encodeURIComponent(subdomain)}.bamboohr.com`;
  const data = await getJson<BH>(`${host}/careers/list`);
  return data.result.map((j) => ({
    id: `bh-${j.id}`,
    title: j.jobOpeningName,
    location: [j.location?.city, j.location?.state].filter(Boolean).join(', ') || 'See posting',
    department: j.departmentLabel,
    type: j.employmentStatusLabel,
    posted: j.datePosted,
    applyUrl: `${host}/careers/${j.id}`,
    sample: false,
    source: 'bamboohr',
  }));
}

/**
 * Generic JSON feed. Expects an array (or {jobs: [...]}) of objects with at
 * least `title` and `url`; optional `location`, `type`, `department`, `posted`, `summary`.
 * Use this for ATS platforms without a dedicated adapter (JazzHR, ADP, custom).
 */
export async function jsonUrl(url: string): Promise<Job[]> {
  const data = await getJson<unknown>(url);
  const list = Array.isArray(data) ? data : (data as { jobs?: unknown[] })?.jobs;
  if (!Array.isArray(list)) throw new Error('JSON feed did not contain an array of jobs');
  return list.map((raw, i) => {
    const j = raw as Record<string, unknown>;
    return {
      id: `json-${text(j.id) ?? i}`,
      title: text(j.title) ?? 'Untitled role',
      location: text(j.location) ?? 'See posting',
      type: text(j.type),
      department: text(j.department),
      posted: text(j.posted) ?? text(j.date),
      applyUrl: text(j.url) ?? text(j.applyUrl),
      summary: text(j.summary) ?? text(j.description),
      sample: false,
      source: 'json-url',
    };
  });
}
