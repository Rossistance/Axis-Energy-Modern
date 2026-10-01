import { test, expect, type Page } from '@playwright/test';
import { sitemapPaths } from './routes';

/**
 * Inner-page headers (2026-09-30 review): every page and subpage uses the compact Services
 * header, so real content shows without scrolling, and the hero illustrations are replaced
 * by photos that the preview labels as placeholders.
 */

const inner = [...sitemapPaths().filter((p) => p !== ''), '404/'];

async function headerHeight(page: Page): Promise<number> {
  return page.evaluate(() => {
    const hero = document.querySelector('main > .page-hero');
    return hero ? hero.getBoundingClientRect().height : 0;
  });
}

test('on desktop every inner page header is the same height as the Services header', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('services/');
  const reference = await headerHeight(page);
  expect(reference).toBeGreaterThan(0);
  expect(reference, 'no taller than the Services header of the review').toBeLessThanOrEqual(310);
  for (const path of inner) {
    await page.goto(path);
    const height = await headerHeight(page);
    expect
      .soft(Math.abs(height - reference), `${path} header is ${height}px`)
      .toBeLessThanOrEqual(1);
  }
});

test('on phones inner page headers stay compact', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of inner) {
    await page.goto(path);
    expect.soft(await headerHeight(page), `${path} header height`).toBeLessThanOrEqual(345);
  }
});

test('every inner page header shows a photo labeled as a placeholder', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const path of inner) {
    await page.goto(path);
    const hero = page.locator('main > .page-hero');
    await expect.soft(hero.locator('.page-hero__photo img'), path).toHaveCount(1);
    await expect.soft(hero.locator('.page-hero__tag'), path).toHaveText('Placeholder photo');
  }
});

test('no page uses the retired hero illustrations', async ({ page }) => {
  for (const path of ['', ...inner]) {
    await page.goto(path);
    const sources = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img, source'))
        .map((el) => `${el.getAttribute('src') ?? ''} ${el.getAttribute('srcset') ?? ''}`)
        .filter((s) => /\/hero-[a-z-]+\./.test(s)),
    );
    expect.soft(sources, `${path || '/'} illustration images`).toEqual([]);
  }
});
