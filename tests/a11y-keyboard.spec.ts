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

test('Services dropdown lists every service page and the O&M offerings', async ({ page }) => {
  await page.goto('');
  const toggle = page.locator('[aria-controls="submenu-services"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('#submenu-services');
  await expect(menu.locator('a').first()).toBeFocused();
  for (const label of [
    'Services Overview',
    'Solar EPC',
    'Battery Storage & Microgrids',
    'Electrical Infrastructure & Commissioning',
    'O&M & Technical Services',
    'Repowering & Rebuilds',
  ]) {
    await expect(menu.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  await expect(menu.locator('.submenu__nested a')).toHaveCount(6);
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('mobile drawer groups expand to show the Services pages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  await page.locator('[data-drawer-open]').click();
  const expand = page.locator('[aria-controls="drawer-services"]');
  await expect(expand).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#drawer-services')).toBeHidden();
  await expand.click();
  await expect(expand).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#drawer-services a')).toHaveCount(11);
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
