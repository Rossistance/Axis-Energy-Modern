import { test, expect, type Page } from '@playwright/test';

/**
 * Home page headline as the owner's diagram (2026-10-01): The Power of Partnership ·
 * Solar | Battery Storage | Microgrids · Performance built · for · four market boxes that
 * open their section of the Markets page.
 */

const markets = [
  ['Commercial & Industrial', 'commercial-industrial'],
  ['Electric Co-ops & Utilities', 'co-ops-utilities'],
  ['Municipal & Institutional', 'municipal-institutional'],
  ['Developers & IPPs', 'developers-ipps'],
] as const;

const diagram = (page: Page) => page.locator('.hero .partnership');

test('the diagram reads top to bottom like the owner’s example', async ({ page }) => {
  await page.goto('');
  const d = diagram(page);
  await expect(d.locator('h1')).toHaveText('The Power of Partnership');
  const services = d.locator('.partnership__services a');
  await expect(services).toHaveText(['Solar', 'Battery Storage', 'Microgrids']);
  await expect(services.nth(0)).toHaveAttribute('href', /\/services\/solar-epc\/$/);
  await expect(services.nth(1)).toHaveAttribute(
    'href',
    /\/services\/battery-storage-and-microgrids\/$/,
  );
  await expect(services.nth(2)).toHaveAttribute(
    'href',
    /\/services\/battery-storage-and-microgrids\/$/,
  );
  await expect(d.locator('.partnership__built')).toHaveText('Performance built');
  await expect(d.locator('.partnership__for')).toHaveText('for');

  const boxes = d.locator('.partnership__markets a');
  await expect(boxes).toHaveCount(4);
  for (const [i, [label, id]] of markets.entries()) {
    await expect(boxes.nth(i)).toHaveAccessibleName(label);
    await expect(boxes.nth(i)).toHaveAttribute('href', new RegExp(`/markets/#${id}$`));
  }
  // The old headline, lead and buttons are gone; the trust strip stays.
  await expect(page.locator('.hero .lead, .hero__actions')).toHaveCount(0);
  await expect(page.locator('.hero__trust li')).toHaveCount(4);
});

test('a market box opens the Markets page at that market', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('');
  await diagram(page).getByRole('link', { name: 'Municipal & Institutional' }).click();
  await expect(page).toHaveURL(/\/markets\/#municipal-institutional$/);
  await expect(page.locator('#municipal-institutional')).toBeInViewport();
});

async function boxes(page: Page) {
  const links = diagram(page).locator('.partnership__markets a');
  const out = [];
  for (let i = 0; i < 4; i++) out.push((await links.nth(i).boundingBox())!);
  return out;
}

for (const width of [1100, 1280, 1440, 768]) {
  test(`at ${width}px the four boxes sit in one row under the branch`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('');
    const b = await boxes(page);
    for (const box of b) expect(Math.abs(box.y - b[0].y)).toBeLessThan(1);
    for (let i = 1; i < 4; i++) expect(b[i].x).toBeGreaterThan(b[i - 1].x + b[i - 1].width);
    // One line per word group: no box grows taller than its neighbours.
    for (const box of b) expect(Math.abs(box.height - b[0].height)).toBeLessThan(1);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(width);
  });
}

for (const width of [390, 1024]) {
  test(`at ${width}px the boxes form two rows of two around a centre spine`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('');
    const b = await boxes(page);
    expect(Math.abs(b[0].y - b[1].y)).toBeLessThan(1);
    expect(Math.abs(b[2].y - b[3].y)).toBeLessThan(1);
    expect(b[2].y).toBeGreaterThan(b[0].y + b[0].height);
    // A visible gap between the columns holds the spine and its arrows.
    expect(b[1].x - (b[0].x + b[0].width)).toBeGreaterThanOrEqual(30);
    const services = await diagram(page)
      .locator('.partnership__services li')
      .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().top)));
    expect(new Set(services).size, 'Solar | Battery Storage | Microgrids on one line').toBe(1);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(width);
  });
}

test('the cards are small and every card has a curved branch ending in a chevron', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('');
  const d = diagram(page);
  for (const box of await boxes(page)) {
    expect(box.width).toBeLessThanOrEqual(120);
    expect(box.height).toBeLessThanOrEqual(64);
  }
  // Four curves (cubic Béziers) fan out from one node to the four cards.
  const curves = d.locator('.partnership__fan--row path');
  await expect(curves).toHaveCount(4);
  for (const path of await curves.all()) {
    await expect(path).toHaveAttribute('d', /^M50 0 C/);
  }
  await expect(d.locator('.partnership__fan--row')).toBeVisible();
  await expect(d.locator('.partnership__fan--grid')).toBeHidden();
  const chevrons = await d
    .locator('.partnership__markets li')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el, '::before').content));
  expect(chevrons).toEqual(['""', '""', '""', '""']);
});

test('on phones the top pair hangs from the curves and each bottom card from the card above', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  const d = diagram(page);
  await expect(d.locator('.partnership__fan--grid')).toBeVisible();
  // No trunk down the middle: two curves, one into each top card.
  await expect(d.locator('.partnership__fan--grid path')).toHaveCount(2);
  await expect(d.locator('.partnership__fan--row')).toBeHidden();
  const items = d.locator('.partnership__markets li');
  const shafts = await items.evaluateAll((els) =>
    els.map((el) => {
      const after = getComputedStyle(el, '::after');
      return after.content === 'none' ? 0 : parseFloat(after.height);
    }),
  );
  // An arrow shaft under each top card, none under the bottom pair.
  expect(shafts[0]).toBeGreaterThan(8);
  expect(shafts[1]).toBeGreaterThan(8);
  expect(shafts[2]).toBe(0);
  expect(shafts[3]).toBe(0);
  // The shaft sits in the gap, between a top card and the card below it.
  const b = await boxes(page);
  expect(b[2].y - (b[0].y + b[0].height)).toBeGreaterThanOrEqual(20);
});
