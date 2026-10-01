import { test, expect } from '@playwright/test';

/**
 * Why Axis (2026-10-01): six placeholder cards awaiting new copy, the stat cards without the
 * rankings list, no O&M excellence section, and the safety partners graphic in place of the
 * testimonial. Employee ownership moved to the home page.
 */

test('the six "Total project peace of mind" cards are placeholders', async ({ page }) => {
  await page.goto('why-axis/');
  const cards = page.locator('.pillars > article');
  await expect(cards).toHaveCount(6);
  await expect(page.locator('.pillar--placeholder')).toHaveCount(6);
  await expect(page.locator('.pillars h3')).toHaveCount(0);
  for (let i = 0; i < 6; i++) {
    await expect(cards.nth(i).locator('.pillar__note')).toHaveText(
      `Card ${i + 1}: title and description to come`,
    );
  }
  // None of the old card titles is left on the page.
  const text = (await page.locator('main').textContent()) ?? '';
  for (const old of ['Total Solution', 'Strong Financial Position', 'Bench Strength']) {
    expect(text).not.toContain(old);
  }
});

test('By the numbers keeps the stat cards and drops the rankings list', async ({ page }) => {
  await page.goto('why-axis/');
  const numbers = page.locator('#by-the-numbers');
  await expect(numbers.locator('h2')).toHaveText('A track record you can underwrite');
  await expect(numbers.locator('.stat')).toHaveCount(5);
  await expect(numbers.locator('table, ol, ul')).toHaveCount(0);
});

test('the O&M excellence section and the testimonials are gone', async ({ page }) => {
  await page.goto('why-axis/');
  await expect(page.locator('#om')).toHaveCount(0);
  await expect(page.locator('main blockquote')).toHaveCount(0);
  const text = (await page.locator('main').textContent()) ?? '';
  expect(text).not.toMatch(/O&M excellence/i);
  expect(text).not.toContain('TJ Murphy');
  expect(text).not.toContain('Environomics');
  // Employee ownership now lives on the home page.
  await expect(page.locator('#employee-owned, .owners')).toHaveCount(0);
});

test('safety shows the three partner logos over an Axis project photo', async ({ page }) => {
  await page.goto('why-axis/');
  const graphic = page.locator('#safety .safety-partners');
  await graphic.scrollIntoViewIfNeeded();
  await expect(graphic.locator('h3')).toHaveText(
    'Our safety program is graded by the industry’s contractor platforms',
  );
  const logos = graphic.locator('.safety-partners__logos img');
  await expect(logos).toHaveCount(3);
  expect(await logos.evaluateAll((els) => els.map((el) => el.getAttribute('alt')))).toEqual([
    'Avetta',
    'Veriforce',
    'ISNetworld',
  ]);
  for (let i = 0; i < 3; i++) {
    const logo = logos.nth(i);
    await expect(logo).toBeVisible();
    await expect
      .poll(() => logo.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true);
    // Full-strength marks: only the photo underneath is toned down.
    expect(await logo.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  }
  const photo = graphic.locator('.safety-partners__photo img');
  await expect(photo).toHaveAttribute('src', /walnut-grove-microgrid/);
  await expect(photo).toHaveAttribute('alt', '');
});

for (const [width, layout] of [
  [1280, 'in a row'],
  [390, 'stacked'],
] as const) {
  test(`the partner logos sit ${layout} at ${width}px without overflowing`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('why-axis/');
    const graphic = page.locator('.safety-partners');
    await graphic.scrollIntoViewIfNeeded();
    const box = (await graphic.boundingBox())!;
    const items = page.locator('.safety-partners__logos li');
    const boxes = [];
    for (let i = 0; i < 3; i++) boxes.push((await items.nth(i).boundingBox())!);
    for (const b of boxes) {
      expect(b.x).toBeGreaterThanOrEqual(box.x);
      expect(b.x + b.width).toBeLessThanOrEqual(box.x + box.width + 0.5);
    }
    if (layout === 'in a row') {
      expect(Math.abs(boxes[0].y - boxes[2].y)).toBeLessThan(2);
      expect(boxes[1].x).toBeGreaterThan(boxes[0].x);
    } else {
      expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
      expect(boxes[2].y).toBeGreaterThan(boxes[1].y);
    }
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(width);
  });
}
