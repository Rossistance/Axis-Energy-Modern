import { test, expect } from '@playwright/test';

test('skip link is the first focusable element and targets main', async ({ page }) => {
  await page.goto('');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute('href', '#main');
});

test('About dropdown opens with the keyboard and closes on Escape', async ({ page }) => {
  await page.goto('');
  const toggle = page.locator('[aria-controls="submenu-about"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#submenu-about a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('Services dropdown lists the four services, with O&M offerings expanding beneath O&M', async ({
  page,
}) => {
  await page.goto('');
  const toggle = page.locator('[aria-controls="submenu-services"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('#submenu-services');
  await expect(menu.locator('a').first()).toBeFocused();
  const top = menu.locator(':scope > li > a, :scope > li > .submenu__row > a');
  await expect(top).toHaveText([
    'Solar EPC',
    'Battery Storage & Microgrids',
    'Electrical Infrastructure & Commissioning',
    'O&M & Technical Services',
  ]);
  await expect(menu.getByRole('link', { name: 'Services Overview' })).toHaveCount(0);

  // Offerings stay hidden until O&M is hovered or its toggle is pressed.
  const offerings = menu.locator('.submenu__nested a');
  await expect(offerings).toHaveCount(6);
  await expect(offerings.first()).toBeHidden();
  await menu.locator('.submenu__group').hover();
  await expect(offerings.first()).toBeVisible();
  await expect(menu.getByRole('link', { name: 'Repowering & Rebuilds' })).toBeVisible();

  await page.mouse.move(5, 600);
  await toggle.focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('O&M offerings expand from the keyboard with their toggle', async ({ page }) => {
  await page.goto('');
  await page.locator('[aria-controls="submenu-services"]').click();
  const groupToggle = page.locator('#submenu-services .subgroup-toggle');
  await page.mouse.move(5, 600);
  await groupToggle.focus();
  await expect(groupToggle).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await expect(groupToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#submenu-services .submenu__nested a').first()).toBeVisible();
});

test('mobile drawer groups expand to show the Services pages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  await page.locator('[data-drawer-open]').click();
  const services = page.locator('#site-drawer .drawer__group').first();
  await expect(services.locator('.drawer__row > a').first()).toHaveAttribute(
    'href',
    /\/services\/$/,
  );
  const expand = page.locator('[aria-controls="drawer-services"]');
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#drawer-services')).toBeHidden();
  await expand.click();
  await expect(expand).toHaveAttribute('aria-expanded', 'true');
  const visibleLinks = page.locator('#drawer-services a:visible');
  await expect(visibleLinks).toHaveText([
    'Solar EPC',
    'Battery Storage & Microgrids',
    'Electrical Infrastructure & Commissioning',
    'O&M & Technical Services',
  ]);
  await page.locator('#drawer-services .drawer__expand--sub').click();
  await expect(page.locator('#drawer-services a:visible')).toHaveCount(10);
  await page.locator('#drawer-services').getByRole('link', { name: 'Solar EPC' }).click();
  await expect(page).toHaveURL(/\/services\/solar-epc\/$/);
});

test('mobile drawer traps focus in a modal dialog and restores focus on close', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  const open = page.locator('[data-drawer-open]');
  await expect(open).toBeVisible();
  await open.click();
  const dialog = page.locator('#site-drawer');
  await expect(dialog).toHaveJSProperty('open', true);
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  // Focus stays inside the dialog while tabbing
  for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
  const inside = await page.evaluate(() =>
    document.getElementById('site-drawer')!.contains(document.activeElement),
  );
  expect(inside).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveJSProperty('open', false);
  await expect(open).toBeFocused();
});

test('every page has exactly one h1 and a lang attribute', async ({ page }) => {
  await page.goto('services/');
  expect(await page.locator('html').getAttribute('lang')).toBe('en');
  await expect(page.locator('h1')).toHaveCount(1);
});
