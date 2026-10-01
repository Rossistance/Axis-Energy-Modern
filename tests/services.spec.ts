import { test, expect } from '@playwright/test';

/** Services: card page, four service pages and the O&M offering placeholders. */

const pages = [
  ['services/solar-epc/', 'Solar EPC'],
  ['services/battery-storage-and-microgrids/', 'Battery Storage & Microgrids'],
  [
    'services/electrical-infrastructure-and-commissioning/',
    'Electrical Infrastructure & Commissioning',
  ],
  ['services/om-and-technical-services/', 'O&M & Technical Services'],
] as const;

test('Services is a single page of four cards, one per service page', async ({ page }) => {
  await page.goto('services/');
  await expect(page.locator('main > section')).toHaveCount(2);
  const cards = page.locator('a.service-card');
  await expect(cards).toHaveCount(4);
  for (const [path, title] of pages) {
    await expect(cards.filter({ hasText: title })).toHaveAttribute('href', new RegExp(`/${path}$`));
  }
});

for (const [path, title] of pages) {
  test(`${title} page has its title, breadcrumb and capability lists`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.locator('.crumbs')).toContainText('Services');
    expect(await page.locator('.service-col').count()).toBeGreaterThanOrEqual(3);
  });
}

test('O&M page links to six offering pages, each a marked placeholder', async ({ page }) => {
  await page.goto('services/om-and-technical-services/');
  const links = page.locator('.offering-card[href*="/om-and-technical-services/"]');
  await expect(links).toHaveCount(6);
  const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')!));
  expect(hrefs.some((h) => h.endsWith('/repowering/'))).toBe(true);
  for (const h of hrefs) {
    await page.goto(h);
    await expect(page.locator('.crumbs')).toContainText('O&M & Technical Services');
    await expect(page.locator('.draft-note')).toContainText('Placeholder page');
    await expect(page.locator('.offering__main li').first()).toBeVisible();
  }
});

test('footer service links point at the new service pages', async ({ page }) => {
  await page.goto('');
  for (const [path, title] of pages) {
    await expect(
      page.locator('footer').getByRole('link', { name: title, exact: true }),
    ).toHaveAttribute('href', new RegExp(`/${path}$`));
  }
});
