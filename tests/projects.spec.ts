import { test, expect } from '@playwright/test';

/**
 * Projects page: projects grouped by type (no filters, no project list table; the markets
 * moved to their own page on 2026-10-01), and one view per service that the service pages'
 * "See projects" link opens, with that service's projects first.
 */

const services = [
  ['solar-epc', 'Solar EPC'],
  ['battery-storage-and-microgrids', 'Battery Storage & Microgrids'],
  ['electrical-infrastructure-and-commissioning', 'Electrical Infrastructure & Commissioning'],
  ['om-and-technical-services', 'O&M & Technical Services'],
] as const;

test('projects are grouped under type headings, with no filters or project table', async ({
  page,
}) => {
  await page.goto('projects/');
  const main = page.locator('main');
  await expect(main.locator('form, select, table, [data-filters]')).toHaveCount(0);

  const groups = page.locator('.type-group');
  expect(await groups.count()).toBeGreaterThanOrEqual(2);
  const headings = await groups.locator('h3').allTextContents();
  expect(new Set(headings).size, 'each type has one group').toBe(headings.length);

  // Every card sits in exactly one group, under a heading naming its type.
  const cards = page.locator('.type-group .project-card');
  const titles = await cards.locator('.project-card__title').allTextContents();
  expect(titles.length).toBeGreaterThanOrEqual(5);
  expect(new Set(titles).size, 'no project appears twice').toBe(titles.length);
  for (const group of await groups.all()) {
    await expect(group.locator('.project-card').first()).toBeVisible();
    await expect(group.locator('.type-group__meta')).toContainText(/\d+ projects?/);
  }
});

test('the Projects page no longer holds the markets', async ({ page }) => {
  await page.goto('projects/');
  await expect(page.locator('#markets, .market, .markets__list')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Markets we serve');
});

test('old links to a market on the Projects page forward to the Markets page', async ({ page }) => {
  await page.goto('projects/#co-ops-utilities');
  await page.waitForURL(/\/markets\/#co-ops-utilities$/);
  await expect(page.locator('#co-ops-utilities')).toBeInViewport();
  await page.goto('projects/#markets');
  await page.waitForURL(/\/markets\/$/);
});

for (const [slug, title] of services) {
  test(`"See projects" on ${title} opens the Projects page focused on its projects`, async ({
    page,
  }) => {
    await page.goto(`services/${slug}/`);
    // The link sits at the foot of the What we deliver section.
    const block = page.locator('.service-block');
    const link = block.locator('.service-block__footer a.see-projects');
    await expect(link).toHaveText(`See projects for ${title}`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/projects/${slug}/$`));

    await expect(page.locator('h1')).toHaveText(`${title} projects`);
    await expect(page.locator('.crumbs li')).toHaveText(['Home', 'Projects', title]);
    const bar = page.locator('.focus-bar');
    await expect(bar).toContainText(`Showing ${title}`);
    await expect(bar.getByRole('link', { name: 'See all projects' })).toHaveAttribute(
      'href',
      /\/projects\/$/,
    );
    await expect(bar.getByRole('link', { name: title })).toHaveAttribute(
      'href',
      new RegExp(`/services/${slug}/$`),
    );

    // The focused projects come first; every other project is still listed once below.
    const focused = await page.locator('.focus__grid .project-card__title').allTextContents();
    expect(focused.length, `${title} has projects`).toBeGreaterThan(0);
    await expect(bar).toContainText(new RegExp(`${focused.length} of \\d+ projects`));
    const others = await page.locator('.type-group .project-card__title').allTextContents();
    expect(others.filter((t) => focused.includes(t))).toEqual([]);
    await page.goto('projects/');
    const all = await page.locator('.project-card__title').allTextContents();
    expect([...focused, ...others].sort()).toEqual([...all].sort());
  });
}

test('each service view shows the projects that fit the service', async ({ page }) => {
  const expectations: Record<string, { has: string[]; not: string[] }> = {
    'battery-storage-and-microgrids': {
      has: ['Walnut Grove Microgrid', 'Wendell Campus Microgrid'],
      not: ['Floyd Road'],
    },
    'om-and-technical-services': {
      has: ['Cooperative Solar and Storage Portfolio'],
      not: ['Floyd Road'],
    },
    'solar-epc': { has: ['Floyd Road'], not: ['Walnut Grove Microgrid'] },
  };
  for (const [slug, { has, not }] of Object.entries(expectations)) {
    await page.goto(`projects/${slug}/`);
    const focused = await page.locator('.focus__grid .project-card__title').allTextContents();
    for (const title of has) expect(focused, slug).toContain(title);
    for (const title of not) expect(focused, slug).not.toContain(title);
  }
});
