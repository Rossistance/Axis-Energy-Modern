import { test, expect, type Page } from '@playwright/test';

/**
 * Projects page after the 2026-09-30 review: projects grouped by type (no filters, no
 * project list table) and a Markets area whose sections the Projects → Markets menu
 * jumps to.
 */

const markets = [
  ['commercial-industrial', 'Commercial & Industrial Owners'],
  ['co-ops-utilities', 'Electric Co-ops & Utilities'],
  ['municipal-institutional', 'Municipal & Institutional'],
  ['developers-ipps', 'Developers & IPPs'],
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

test('markets are sections of the Projects page, in order, with Investor-Owned inside Co-ops & Utilities', async ({
  page,
}) => {
  await page.goto('projects/');
  const area = page.locator('#markets');
  await expect(area.locator('h2')).toHaveText('Markets we serve');
  const ids = await area
    .locator('.markets__list > .market')
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(markets.map(([id]) => id));
  for (const [id, title] of markets) {
    await expect(page.locator(`#${id} h3`)).toHaveText(title);
  }
  const investor = page.locator('#co-ops-utilities #investor-owned');
  await expect(investor).toHaveCount(1);
  await expect(investor.locator('h4')).toHaveText('Investor-Owned');

  // Each market lists its projects, or offers references on request.
  for (const [id] of markets) {
    const section = page.locator(`#${id}`);
    const listed = await section.locator('.market-project').count();
    const empty = await section.locator('.market-empty').count();
    expect(listed + empty, `${id} shows projects or a note`).toBeGreaterThan(0);
  }
});

async function openProjectsMenu(page: Page) {
  const toggle = page.locator('[aria-controls="submenu-projects"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  return page.locator('#submenu-projects');
}

test('Projects menu has Markets, which expands to the four markets and Investor-Owned', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('');
  const menu = await openProjectsMenu(page);
  await expect(menu.locator(':scope > li > .submenu__row > a')).toHaveText(['Markets']);
  await expect(menu.getByRole('link', { name: 'Markets', exact: true })).toHaveAttribute(
    'href',
    /\/projects\/#markets$/,
  );
  const items = menu.locator('.submenu__nested > li > a');
  await expect(items).toHaveText(markets.map(([, title]) => title));
  for (const [i, [id]] of markets.entries()) {
    await expect(items.nth(i)).toHaveAttribute('href', new RegExp(`/projects/#${id}$`));
  }
  const investor = menu.locator('.submenu__deep a');
  await expect(investor).toHaveText(['Investor-Owned']);
  await expect(investor).toHaveAttribute('href', /\/projects\/#investor-owned$/);
  // Investor-Owned is listed under Electric Co-ops & Utilities.
  await expect(
    menu.locator('.submenu__nested > li', { hasText: 'Electric Co-ops & Utilities' }),
  ).toContainText('Investor-Owned');
});

test('on the Projects page a market link jumps to its section and closes the menu', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('projects/');
  const menu = await openProjectsMenu(page);
  await menu.locator('.submenu__group').hover();
  await menu.getByRole('link', { name: 'Municipal & Institutional' }).click();
  await expect(page).toHaveURL(/\/projects\/#municipal-institutional$/);
  await expect(page.locator('#municipal-institutional')).toBeInViewport();
  await expect(menu).toBeHidden();
  // Same page: no navigation, the menu reopens normally once the pointer has left it.
  await page.mouse.move(640, 700);
  await expect(page.locator('[data-submenu].is-suppressed')).toHaveCount(0);
});

test('from another page, a market link opens the Projects page at that market', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('about/');
  const menu = await openProjectsMenu(page);
  await menu.locator('.submenu__group').hover();
  await menu.getByRole('link', { name: 'Investor-Owned' }).click();
  await expect(page).toHaveURL(/\/projects\/#investor-owned$/);
  await expect(page.locator('#investor-owned')).toBeInViewport();
});

test('mobile drawer lists Markets under Projects and jumps to a market', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('contact/');
  await page.locator('[data-drawer-open]').click();
  await page.locator('[aria-controls="drawer-projects"]').click();
  const group = page.locator('#drawer-projects');
  await group.locator('.drawer__expand--sub').click();
  await expect(group.locator('.drawer__nested > li > a')).toHaveText(
    markets.map(([, title]) => title),
  );
  await expect(group.locator('.drawer__deep a')).toHaveText(['Investor-Owned']);
  await group.getByRole('link', { name: 'Developers & IPPs' }).click();
  await expect(page).toHaveURL(/\/projects\/#developers-ipps$/);
  await expect(page.locator('#site-drawer')).toHaveJSProperty('open', false);
  await expect(page.locator('#developers-ipps')).toBeInViewport();
});
