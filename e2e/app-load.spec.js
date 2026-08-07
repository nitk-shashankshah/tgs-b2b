const { test, expect } = require('@playwright/test');

test.describe('Application load', () => {
  test('home page loads with header, hero and footer', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Flone/);

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
    await expect(header.locator('a[href="/shop-grid-standard"]:visible').first()).toBeVisible();
    await expect(header.locator('a[href="/contact"]:visible').first()).toBeVisible();
    await expect(header.locator('a[href="/wishlist"]:visible').first()).toBeVisible();
    await expect(header.locator('a[href="/compare"]:visible').first()).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Summer Offer 2026 Collection' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'SHOP NOW' }).first()).toBeVisible();

    const footer = page.getByRole('contentinfo');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'ABOUT US' })).toBeVisible();
  });

  test('product catalog renders on the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'DAILY DEALS!' })).toBeVisible();

    // The deals section has three tabs (New Arrivals / Best Sellers / Sale Items);
    // react-tabs keeps inactive tab panels in the DOM with display:none, so scope
    // to the active panel and use the heading link rather than the overlay action
    // links, which stay hidden until hover.
    const activePanel = page.locator('[role="tabpanel"]:visible');
    const productTitles = activePanel.locator('h3').filter({ has: page.locator('a[href^="/product/"]') });
    await expect(productTitles.first()).toBeVisible();
    expect(await productTitles.count()).toBeGreaterThan(0);
  });

  test('main navigation links route to the expected pages', async ({ page }) => {
    await page.goto('/');

    await page.locator('a[href="/shop-grid-standard"]:visible').first().click();
    await expect(page).toHaveURL(/\/shop-grid-standard/);

    await page.goto('/');
    await page.locator('a[href="/contact"]:visible').first().click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
