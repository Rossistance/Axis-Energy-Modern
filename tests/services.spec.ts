import { test, expect } from '@playwright/test';

/**
 * Services: card page, three service pages under /services/, and O&M & Technical Services as
 * a stand-alone one-page site whose offerings are sections (owner, 2026-10-28).
 */

const servicePages = [
  ['services/solar-epc/', 'Solar EPC'],
  ['services/battery-storage-and-microgrids/', 'Battery Storage & Microgrids'],
  [
    'services/electrical-infrastructure-and-commissioning/',
    'Electrical Infrastructure & Commissioning',
  ],
] as const;
const pages = [
  ...servicePages,
  ['om-and-technical-services/', 'O&M & Technical Services'],
] as const;

const offerings = [
  'preventive-maintenance',
  'corrective-maintenance',
  'performance-monitoring',
  'repowering',
  'storm-damage',
  'decommissioning',
];

test('Services is a single page of four cards, one per service page', async ({ page }) => {
  await page.goto('services/');
  await expect(page.locator('main > section')).toHaveCount(2);
  const cards = page.locator('a.service-card');
  await expect(cards).toHaveCount(4);
  for (const [path, title] of pages) {
    await expect(cards.filter({ hasText: title })).toHaveAttribute('href', new RegExp(`/${path}$`));
  }
});

for (const [path, title] of servicePages) {
  test(`${title} page has its title, breadcrumb and capability lists`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveText(title);
    await expect(page.locator('.crumbs')).toContainText('Services');
    expect(await page.locator('.service-col').count()).toBeGreaterThanOrEqual(3);
  });
}

for (const [path, title] of servicePages) {
  test(`${title} ends What we deliver with See projects instead of an In the field section`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator('#related-title')).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('In the field');
    await expect(page.locator('main .project-card')).toHaveCount(0);
    const block = page.locator('.service-block');
    await expect(block.locator('.eyebrow').first()).toHaveText('What we deliver');
    // The pill is the last thing in the section.
    const last = block.locator('.container > :last-child');
    await expect(last).toHaveClass(/service-block__footer/);
    await expect(last.locator('a')).toHaveText(`See projects for ${title}`);
    await expect(last.locator('a')).toBeVisible();
  });
}

test('Solar EPC experience says Community and Distributed Generation, not utility scale', async ({
  page,
}) => {
  await page.goto('services/solar-epc/');
  const experience = page.locator('section[aria-labelledby="experience-title"]');
  await expect(experience.locator('h2')).toHaveText('Community, commercial and specialty solar');
  await expect(experience.locator('h3')).toHaveText([
    'Community and Distributed Generation',
    'Commercial & industrial',
    'Specialty projects',
  ]);
  await expect(experience).not.toContainText(/utility/i);
});

test('O&M is one page that leads with Yadkinville and holds the six offerings as sections', async ({
  page,
}) => {
  await page.goto('om-and-technical-services/');
  await expect(page.locator('h1')).toHaveText('O&M & Technical Services');
  await expect(page.locator('.crumbs li')).toHaveText(['Home', 'O&M & Technical Services']);
  // The featured repowering project comes before the offerings.
  const featured = page.locator('#featured');
  await expect(featured.locator('h2')).toHaveText('Yadkinville Storm Recovery and Rebuild');
  await expect(featured.getByRole('link', { name: /Read the project/ })).toHaveAttribute(
    'href',
    /\/project\/yadkinville-solar\/$/,
  );
  const ids = await page.locator('.om-offering').evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(offerings);
  for (const id of offerings) {
    await expect(page.locator(`#${id} h3`)).toBeVisible();
    await expect(page.locator(`#${id} li`).first()).toBeVisible();
  }
  // "Proven at" links show the services in practice.
  await expect(page.locator('#corrective-maintenance .om-offering__proof a')).toHaveAttribute(
    'href',
    /\/project\/edenton-inverter-thermal-event-recovery\/$/,
  );
  // The "On this page" bar and the project cards.
  const bar = page.locator('[data-subnav] a');
  await expect(bar.first()).toHaveAttribute('href', '#featured');
  await expect(bar).toHaveCount(offerings.length + 2);
  expect(await page.locator('#om-projects .project-card').count()).toBeGreaterThanOrEqual(4);
  await expect(page.locator('#om-projects .project-card__title').first()).toHaveText(
    'Yadkinville Storm Recovery and Rebuild',
  );
  await expect(page.locator('.draft-note')).toHaveCount(0);
});

test('an O&M menu item jumps to its section of the O&M page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('about/');
  const toggle = page.locator('[aria-controls="submenu-o-m"]');
  await toggle.click();
  await page
    .locator('#submenu-o-m')
    .getByRole('link', { name: 'Storm Damage Assessment & Repair' })
    .click();
  await expect(page).toHaveURL(/\/om-and-technical-services\/#storm-damage$/);
  await expect(page.locator('#storm-damage')).toBeInViewport();
  // Only O&M is marked as the current menu item, not Services.
  await expect(page.locator('.primary-nav__list > li > a[aria-current="page"]')).toHaveText([
    'O&M',
  ]);
});

test('the old O&M pages forward to the one-page site and its sections', async ({ page }) => {
  await page.goto('services/om-and-technical-services/');
  await page.waitForURL(/\/om-and-technical-services\/$/);
  await expect(page).not.toHaveURL(/\/services\//);
  for (const id of ['repowering', 'decommissioning']) {
    await page.goto(`services/om-and-technical-services/${id}/`);
    await page.waitForURL(new RegExp(`/om-and-technical-services/#${id}$`));
    await expect(page.locator(`#${id}`)).toBeVisible();
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
