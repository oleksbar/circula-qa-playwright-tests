// tests/signUpCountryDropdown.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Sign-up Country Dropdown', () => {
  test('should contain Sweden in the dropdown', async ({ page }) => {

    await page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');

    // Accept cookies/consent dialog
    const acceptAllButton = page.getByRole('button', { name: 'Accept All' });
    await acceptAllButton.click();

    // Fill email and password
    await page.fill('input[name="email"]', 'test+apr10@example.com');
    await page.fill('input[name="password"]', 'QWErtz123456!');

    // Select checkbox 'acceptTos'
    const element = await page.locator('input[name="acceptTos"] >> xpath=..');
    const boundingBox = await element.boundingBox();
    await page.mouse.click(boundingBox.x, boundingBox.y); 

    // Select checkbox 'sendNewsletter' 
    await page.locator('input[name="sendNewsletter"] >> xpath=..').check(); 

    // Click the submit button
    await page.getByRole('button', { name: 'Try for free' }).click();



    // const countryDropdown = page.getByLabel('Where’s your company registered?');
    // await countryDropdown.click();

    // const swedenOption = page.getByRole('option', { name: 'Sweden' });
    // await expect(swedenOption).toBeVisible();
  });

  // test('should allow selecting Sweden', async ({ page }) => {
  //   await page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');

  //   const countryDropdown = page.getByLabel('Where’s your company registered?');
  //   await countryDropdown.click();
  //   await page.getByRole('option', { name: 'Sweden' }).click();

  //   await expect(countryDropdown).toHaveText(/Sweden/);
  // });
});