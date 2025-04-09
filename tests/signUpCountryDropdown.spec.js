// tests/signUpCountryDropdown.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Sign-up Country Dropdown', () => {
  test('should contain Sweden in the dropdown', async ({ page }) => {
    await page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');

    const countryDropdown = page.getByLabel('Where’s your company registered?');
    await countryDropdown.click();

    const swedenOption = page.getByRole('option', { name: 'Sweden' });
    await expect(swedenOption).toBeVisible();
  });

  test('should allow selecting Sweden', async ({ page }) => {
    await page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');

    const countryDropdown = page.getByLabel('Where’s your company registered?');
    await countryDropdown.click();
    await page.getByRole('option', { name: 'Sweden' }).click();

    await expect(countryDropdown).toHaveText(/Sweden/);
  });
});