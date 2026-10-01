import { test, expect, type Page } from '@playwright/test';

/**
 * Markets: its own page since 2026-10-01 (it was a section of the Projects page), with a
 * top-level Markets menu whose links jump to each market's section.
 */

const markets = [
  ['commercial-industrial', 'Commercial & Industrial Owners'],
  ['co-ops-utilities', 'Electric Co-ops & Utilities'],
  ['municipal-institutional', 'Municipal & Institutional'],
  ['developers-ipps', 'Developers & IPPs'],
] as const;

test('the Markets page lists the four markets, with Investor-Owned inside Co-ops & Utilities', async ({
  page,
}) => {
  await page.goto('markets/');
  await expect(page.locator('h1')).toHaveText('Markets we serve');
  await expect(page.locator('.crumbs li')).toHaveText(['Home', 'Markets']);
  const ids = await page
    .locator('.markets__list > .market')
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(markets.map(([id]) => id));
  for (const [id, title] of markets) {
    await expect(page.locator(`#${id} > .market__intro h2`)).toHaveText(title);
  }
  const investor = page.locator('#co-ops-utilities #investor-owned');
  await expect(investor).toHaveCount(1);
  await expect(investor.locator('h3')).toHaveText('Investor-Owned');

  // Each market lists its projects, or offers references on request.
  for (const [id] of markets) {
    const section = page.locator(`#${id}`);
    const listed = await section.locator('.market-project').count();
    const empty = await section.locator('.market-empty').count();
    expect(listed + empty, `${id} shows projects or a note`).toBeGreaterThan(0);
  }
  await expect(page.getByRole('link', { name: 'Request case studies' }).last()).toHaveAttribute(
    'href',
    /topic=case-studies/,
  );
});

test('the menu reads Services, Markets, Projects, Why Axis, About us, News, Careers, Contact', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('');
  await expect(page.locator('.primary-nav__list > li > a')).toHaveText([
    'Services',
    'Markets',
    'Projects',
    'Why Axis',
    'About us',
    'News',
    'Careers',
    'Contact',
  ]);
  // Projects is a plain link now; Markets has the dropdown.
  await expect(page.locator('#submenu-projects')).toHaveCount(0);
  await expect(page.locator('#submenu-markets')).toHaveCount(1);
});

for (const width of [1100, 1180, 1280, 1440]) {
  test(`every menu item fits on one line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('');
    const heights = await page
      .locator('.primary-nav__list > li > a')
      .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height)));
    expect(new Set(heights).size, `item heights ${heights.join(', ')}`).toBe(1);
    // The menu stays clear of the logo and of the Work with Axis button.
    const gap = await page.evaluate(() => {
      const brand = document.querySelector('.brand')!.getBoundingClientRect();
      const list = document.querySelector('.primary-nav__list')!.getBoundingClientRect();
      const actions = document.querySelector('.site-header__actions')!.getBoundingClientRect();
      return { left: list.left - brand.right, right: actions.left - list.right };
    });
    expect(gap.left).toBeGreaterThan(0);
    expect(gap.right).toBeGreaterThan(0);
  });
}

async function openMarketsMenu(page: Page) {
  const toggle = page.locator('[aria-controls="submenu-markets"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  return page.locator('#submenu-markets');
}

test('the Markets menu lists the four markets, with Investor-Owned under Co-ops & Utilities', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('');
  await expect(
    page.locator('.primary-nav').getByRole('link', { name: 'Markets', exact: true }),
  ).toHaveAttribute('href', /\/markets\/$/);
  const menu = await openMarketsMenu(page);
  const items = menu.locator(':scope > li > a, :scope > li > .submenu__row > a');
  await expect(items).toHaveText(markets.map(([, title]) => title));
  for (const [i, [id]] of markets.entries()) {
    await expect(items.nth(i)).toHaveAttribute('href', new RegExp(`/markets/#${id}$`));
  }
  const group = menu.locator('.submenu__group', { hasText: 'Electric Co-ops & Utilities' });
  await group.hover();
  const investor = group.locator('.submenu__nested a');
  await expect(investor).toHaveText(['Investor-Owned']);
  await expect(investor).toHaveAttribute('href', /\/markets\/#investor-owned$/);
});

test('on the Markets page a market link jumps to its section and closes the menu', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('markets/');
  const menu = await openMarketsMenu(page);
  await menu.getByRole('link', { name: 'Municipal & Institutional' }).click();
  await expect(page).toHaveURL(/\/markets\/#municipal-institutional$/);
  await expect(page.locator('#municipal-institutional')).toBeInViewport();
  await expect(menu).toBeHidden();
  // Same page: no navigation, the menu reopens normally once the pointer has left it.
  await page.mouse.move(640, 700);
  await expect(page.locator('[data-submenu].is-suppressed')).toHaveCount(0);
});

test('from another page, a market link opens the Markets page at that market', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('about/');
  const menu = await openMarketsMenu(page);
  await menu.locator('.submenu__group').hover();
  await menu.getByRole('link', { name: 'Investor-Owned' }).click();
  await expect(page).toHaveURL(/\/markets\/#investor-owned$/);
  await expect(page.locator('#investor-owned')).toBeInViewport();
});

test('the phone menu lists the markets under Markets and jumps to one', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('contact/');
  await page.locator('[data-drawer-open]').click();
  await expect(
    page.locator(
      '#site-drawer .drawer__list > li > a, #site-drawer .drawer__list > li > .drawer__row > a',
    ),
  ).toHaveText([
    'Services',
    'Markets',
    'Projects',
    'Why Axis',
    'About us',
    'News',
    'Careers',
    'Contact',
  ]);
  await page.locator('[aria-controls="drawer-markets"]').click();
  const group = page.locator('#drawer-markets');
  await expect(group.locator(':scope > li > a, :scope > li > .drawer__row > a')).toHaveText(
    markets.map(([, title]) => title),
  );
  await group.locator('.drawer__expand--sub').click();
  await expect(group.locator('.drawer__nested a')).toHaveText(['Investor-Owned']);
  await group.getByRole('link', { name: 'Developers & IPPs' }).click();
  await expect(page).toHaveURL(/\/markets\/#developers-ipps$/);
  await expect(page.locator('#site-drawer')).toHaveJSProperty('open', false);
  await expect(page.locator('#developers-ipps')).toBeInViewport();
});
