import { test, expect, type Page } from '@playwright/test';

/** Home page hero: project photo carousel and the three highlight links. */

const carousel = (page: Page) => page.locator('[data-carousel]');
const activeSlide = (page: Page) => page.locator('[data-carousel] [data-slide].is-active');

test('highlight bubbles link to Projects, About and Why Axis', async ({ page }) => {
  await page.goto('');
  const chips = page.locator('.hero__chips a');
  await expect(chips).toHaveCount(3);
  await expect(chips.nth(0)).toContainText('150 MW');
  await expect(chips.nth(0)).toHaveAttribute('href', /\/projects\/$/);
  await expect(chips.nth(1)).toContainText('employee-owned');
  await expect(chips.nth(1)).toHaveAttribute('href', /\/about\/$/);
  await expect(chips.nth(2)).toContainText('Top Solar Contractor');
  await expect(chips.nth(2)).toHaveAttribute('href', /\/why-axis\/#by-the-numbers$/);
});

test('the Top Solar Contractor bubble opens Why Axis at the recognition', async ({ page }) => {
  await page.goto('');
  await page.locator('.hero__chips a', { hasText: 'Top Solar Contractor' }).click();
  await expect(page).toHaveURL(/\/why-axis\/#by-the-numbers$/);
  const heading = page.locator('#numbers-title');
  await expect(heading).toBeInViewport();
  // The sticky header must not cover the section heading.
  const headerBottom = await page
    .locator('.site-header')
    .evaluate((el) => el.getBoundingClientRect().bottom);
  const headingTop = await heading.evaluate((el) => el.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

for (const width of [390, 1280]) {
  test(`bubbles are visible and clickable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('');
    const chips = page.locator('.hero__chips a');
    for (let i = 0; i < 3; i++) await expect(chips.nth(i)).toBeVisible();
    // Playwright refuses to click an element covered by another, so this also proves
    // the bubbles sit above the photos on desktop.
    await chips.nth(1).click();
    await expect(page).toHaveURL(/\/about\/$/);
  });
}

test('carousel shows project photos with captions linking to each project', async ({ page }) => {
  await page.goto('');
  const slides = carousel(page).locator('[data-slide]');
  const count = await slides.count();
  expect(count).toBeGreaterThanOrEqual(2);
  await expect(activeSlide(page)).toHaveCount(1);
  await expect(activeSlide(page).locator('img')).toHaveAttribute('alt', /\S/);
  await expect(activeSlide(page).locator('a')).toHaveAttribute('href', /\/project\/[a-z0-9-]+\/$/);
  await expect(carousel(page).locator('[data-controls]')).toBeVisible();
});

test('previous, next and dot buttons change the photo and the slideshow keeps playing', async ({
  page,
}) => {
  await page.goto('');
  const count = await carousel(page).locator('[data-slide]').count();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^1 of /);

  await carousel(page).locator('[data-next]').click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);
  await expect(carousel(page).locator('[data-slide]').first()).toHaveAttribute('inert', '');
  // Paused only while the pointer is over the carousel; it plays again once it leaves.
  await expect(carousel(page)).toHaveAttribute('data-state', 'paused');
  await page.mouse.move(0, 0);
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');

  await carousel(page).locator('[data-prev]').click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^1 of /);

  await carousel(page).locator('[data-dot]').last().click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', new RegExp(`^${count} of `));
  await expect(carousel(page).locator('[data-dot]').last()).toHaveAttribute('aria-current', 'true');
  await page.mouse.move(0, 0);
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');
});

test('there is no visible pause button, only the arrows and dots', async ({ page }) => {
  await page.goto('');
  const controls = carousel(page).locator('[data-controls]');
  await expect(controls.locator('button')).toHaveCount(
    (await carousel(page).locator('[data-slide]').count()) + 2,
  );
  await expect(controls.locator('[data-toggle]')).toHaveCount(0);
  // The keyboard-only Pause button takes no space until it is focused.
  const box = (await carousel(page).locator('[data-toggle]').boundingBox())!;
  expect(box.width).toBeLessThanOrEqual(1);
});

test('slideshow advances on its own; hovering pauses it and leaving resumes it', async ({
  page,
}) => {
  await page.clock.install();
  await page.goto('');
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');

  await page.clock.runFor(6500);
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);

  await carousel(page).locator('[data-viewport]').hover();
  await expect(carousel(page)).toHaveAttribute('data-state', 'paused');
  await page.clock.runFor(13000);
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);

  await page.mouse.move(0, 0);
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');
  await page.clock.runFor(6500);
  await expect(activeSlide(page)).not.toHaveAttribute('aria-label', /^2 of /);
});

test('keyboard focus pauses the slideshow, and a keyboard-only Pause button stops it', async ({
  page,
}) => {
  await page.goto('');
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');
  await page.locator('.hero__chips a').last().focus();
  await page.keyboard.press('Tab');
  const toggle = carousel(page).locator('[data-toggle]');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveText('Pause slideshow');
  expect((await toggle.boundingBox())!.width).toBeGreaterThan(60);
  await expect(carousel(page)).toHaveAttribute('data-state', 'paused');

  await page.keyboard.press('Enter');
  await expect(carousel(page)).toHaveAttribute('data-state', 'stopped');
  await expect(toggle).toHaveText('Play slideshow');
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveText('Pause slideshow');

  // Focus leaving the carousel lets it play again.
  await page.locator('.hero__chips a').last().focus();
  await expect(carousel(page)).toHaveAttribute('data-state', 'playing');
});

test('each photo pans and zooms, alternating direction, and captions never overlap', async ({
  page,
}) => {
  await page.goto('');
  const animation = (i: number) =>
    carousel(page)
      .locator('[data-slide] img')
      .nth(i)
      .evaluate((img) => getComputedStyle(img).animationName);
  expect(await animation(0)).toBe('kb-1');
  await carousel(page).locator('[data-next]').click();
  await expect(activeSlide(page)).toHaveAttribute('aria-label', /^2 of /);
  expect(await animation(1)).toBe('kb-2');
  // The caption of the photo that is fading out is already hidden.
  const firstCaption = carousel(page).locator('[data-slide]').first().locator('.carousel__caption');
  await expect.poll(() => firstCaption.evaluate((el) => getComputedStyle(el).opacity)).toBe('0');
});

test.describe('with reduced motion', () => {
  test('the slideshow does not rotate on its own and the photos stay still', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.clock.install();
    await page.goto('');
    await expect(carousel(page)).toHaveAttribute('data-state', 'stopped');
    await page.clock.runFor(13000);
    await expect(activeSlide(page)).toHaveAttribute('aria-label', /^1 of /);
    expect(
      await activeSlide(page)
        .locator('img')
        .evaluate((img) => getComputedStyle(img).animationName),
    ).toBe('none');
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the first photo shows on its own and the controls stay hidden', async ({ page }) => {
    await page.goto('');
    const slides = page.locator('[data-carousel] [data-slide]');
    await expect(slides.first()).toBeVisible();
    await expect(slides.nth(1)).toBeHidden();
    await expect(page.locator('[data-carousel] [data-controls]')).toBeHidden();
    await expect(page.locator('[data-carousel] [data-toggle]')).toBeHidden();
    await expect(page.locator('.hero__chips a')).toHaveCount(3);
  });
});
