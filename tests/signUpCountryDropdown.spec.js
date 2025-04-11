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

    // Select checkbox 'acceptTos' (by clicking on the top left corner of the element since there are hyperlinks in the text)
    const element = await page.locator('input[name="acceptTos"] >> xpath=..');
    const boundingBox = await element.boundingBox();
    await page.mouse.click(boundingBox.x, boundingBox.y); 

    // Select checkbox 'sendNewsletter' 
    await page.locator('input[name="sendNewsletter"] >> xpath=..').check(); 

    // Click the submit button
    await page.getByRole('button', { name: 'Try for free' }).click();

    // Enter first name
    await page.fill('input[name="firstname"]', 'Oleks');

    // Enter last name
    await page.fill('input[name="lastname"]', 'Bar');

    // Enter a number
    await page.fill('input[name="phoneNumber"]', '0123456789');

    // Click the 'Next step' button
    await page.locator('button[type="submit"]').click();

    // Enter company name
    await page.fill('input[name="organizationName"]', 'QA test');

    // Click on the country select field
    await page.locator('input[name="country"]').click();

    await page.waitForTimeout(1000);

    // Step 1: Type partial country name to trigger filtering
    await page.fill('input[name="country"]', 'Sweden'); // or 'Schwe' if fuzzy search

    // Step 2: Wait until filtered list appears
    await page.waitForSelector('[data-testid="autocomplete-menu-portal"] li:has-text("Sweden")', {
      state: 'visible',
    });

    // Step 3: Get the locator for "Sweden"
    const swedenOption = page.locator('div[data-testid="autocomplete-menu-portal"] li:has-text("Sweden")');

    // Step 4: Wait until it's stable
    await page.waitForTimeout(1000); // allow animations to settle


    await page.evaluate(() => {
      const items = document.querySelectorAll('[data-testid="autocomplete-menu-portal"] li');
      for (const item of items) {
        if (item.textContent?.trim() === 'Sweden') {
          item.click();
          break;
        }
      }
    });

    await expect(page.locator('input[name="country"]')).toHaveValue('Sweden');


    // Click on the hdyhau select field
    await page.locator('input[name="hdyhau"]').click();

    await page.waitForTimeout(1000);

    await page.locator('div[data-valuetext="Social Media (LinkedIn, Instagram, etc.)"]').click()

    await expect(page.locator('input[name="hdyhau"]')).toHaveValue('Social Media (LinkedIn, Instagram, etc.)')


 


    // await page.locator('input[name="hdyhau"]').click();

    // await page.getByText('Soziale Medien (LinkedIn, Instagram, usw.)').click();

  });

  // test('should allow selecting Sweden', async ({ page }) => {
  //   await page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');

  //   const countryDropdown = page.getByLabel('Where’s your company registered?');
  //   await countryDropdown.click();
  //   await page.getByRole('option', { name: 'Sweden' }).click();

  //   await expect(countryDropdown).toHaveText(/Sweden/);
  // });
});