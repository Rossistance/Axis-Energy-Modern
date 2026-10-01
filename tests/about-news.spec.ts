import { test, expect } from '@playwright/test';

/**
 * About and News after the 2026-10-01 review: About keeps its history and family of
 * companies, with employee ownership after the history; Leadership is its own page under
 * About, and News is the LinkedIn post feed.
 */

test('About keeps history and the family of companies, and drops the other sections', async ({
  page,
}) => {
  await page.goto('about/');
  const main = page.locator('main');
  await expect(main.getByRole('heading', { name: 'Excellence for over 100 years' })).toBeVisible();
  await expect(
    main.getByRole('heading', { name: 'Built on strong partnerships since 1910' }),
  ).toBeVisible();
  for (const text of [
    'Mission and vision',
    'Our culture',
    'Partnership with all of our people',
    'Where we work',
    'Our leadership',
    'Meet the team',
  ]) {
    await expect(main.getByText(text, { exact: true }), text).toHaveCount(0);
  }
});

test('A company of owners follows the history on About', async ({ page }) => {
  await page.goto('about/');
  const ids = await page
    .locator('main > section')
    .evaluateAll((els) => els.map((el) => el.id || el.getAttribute('aria-labelledby')));
  expect(ids.slice(1)).toEqual(['history-title', 'employee-owned', 'family-title']);
  const owners = page.locator('#employee-owned');
  await expect(owners.locator('h2')).toHaveText('A company of owners');
  await expect(owners.locator('blockquote')).toContainText('a company of owners');
  await expect(owners.locator('figcaption')).toContainText('Josh Butler, President, Axis Energy');
  await expect(owners.locator('.owners__card')).toContainText('100% employee-owned');
});

test('each family company links to its own website', async ({ page }) => {
  await page.goto('about/');
  const cards = page.locator('a.family');
  await expect(
    cards.filter({ has: page.locator('h3', { hasText: '1910 Legacy' }) }),
  ).toHaveAttribute('href', 'https://www.1910legacy.com');
  await expect(
    cards.filter({ has: page.locator('h3', { hasText: 'White Electrical' }) }),
  ).toHaveAttribute('href', 'https://www.white-electrical.com');
});

test('Leadership is its own page under About us', async ({ page }) => {
  await page.goto('about/leadership/');
  await expect(page.locator('h1')).toHaveText('Renewable Experience and Expertise');
  await expect(page.locator('.crumbs li')).toHaveText(['Home', 'About us', 'Leadership']);

  await page.goto('');
  await page.locator('[aria-controls="submenu-about-us"]').click();
  const items = page.locator('#submenu-about-us a');
  await expect(items).toHaveText(['Leadership']);
  await expect(items).toHaveAttribute('href', /\/about\/leadership\/$/);

  await page.goto('leadership/');
  await page.waitForURL(/\/about\/leadership\/$/);
});

test('News shows LinkedIn posts only: no rankings column and no 2018 stories', async ({ page }) => {
  await page.goto('news/');
  const main = page.locator('main');
  await expect(main.locator('aside, table')).toHaveCount(0);
  await expect(main.getByText('Recognition', { exact: true })).toHaveCount(0);
  await expect(main.getByText(/Five takeaways|Solar could provide 25%/)).toHaveCount(0);

  const cards = main.locator('.post-card');
  expect(await cards.count()).toBeGreaterThan(0);
  for (const link of await cards.locator('.post-card__title a').all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\/www\.linkedin\.com\//);
    await expect(link).toHaveAttribute('target', '_blank');
  }
  await expect(main.getByRole('link', { name: 'Follow Axis on LinkedIn' }).first()).toHaveAttribute(
    'href',
    /linkedin\.com\/company\//,
  );
});

test('in the preview, sample posts are marked and the feed status is explained', async ({
  page,
}) => {
  await page.goto('news/');
  const samples = page.locator('.post-card__sample');
  expect(await samples.count()).toBeGreaterThan(0);
  await expect(samples.first()).toHaveText('Sample');
  await expect(page.locator('.feed-note')).toContainText('LinkedIn feed not connected');
});

test('the 2018 article addresses lead to News, and the RSS feed is gone', async ({ page }) => {
  for (const path of [
    'five-takeaways-from-a-nc-energy-policy-panel/',
    'news/solar-could-provide-25-of-the-worlds-energy-by-2050/',
  ]) {
    await page.goto(path);
    await page.waitForURL(/\/news\/$/);
  }
  const rss = await page.request.get('rss.xml');
  expect(rss.status()).toBe(404);
});
