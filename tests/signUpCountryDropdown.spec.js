// tests/signUpCountryDropdown.spec.js
const { test, expect } = require("@playwright/test");
const { SignUpPage } = require("../pages/SignUpPage");

test.describe("Sign-up Country Dropdown", () => {
  test("should sign up a user with Sweden country selected", async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);

    // Go to the sign up page
    await page.goto("https://circula-qa-challenge.vercel.app/users/sign_up");

    // Accept cookies/consent dialog
    const acceptAllButton = page.getByRole("button", { name: "Accept All" });
    await acceptAllButton.click();

    // Sign up - Step 1
    await signUpPage.fillEmail("test+apr11@example.com");
    await signUpPage.fillPassword("QWErtz123456!");
    await signUpPage.selectCheckboxAcceptTos();
    await signUpPage.selectCheckboxSendNewsletter();

    // Click the submit button
    await signUpPage.clickSubmitButton();

    // Sign up - Step 2
    await signUpPage.verifyStep2isLoaded();
    await signUpPage.enterFirstName("Oleks");
    await signUpPage.enterLastName("Oleks");
    await signUpPage.enterPhoneNumber("0123456789");

    // Click the submit button
    await signUpPage.clickSubmitButton();

    /**
     * STEP3
     */
    await signUpPage.verifyStep3isLoaded()
    await signUpPage.fillCompanyName("QA test")

    await signUpPage.selectCountryDropdownOption("Sweden");
    await signUpPage.selectHdyhauDropdownOption(
      "Social Media (LinkedIn, Instagram, etc.)"
    );
  });

  // test('should allow selecting Sweden', async ({ page }) => {
  //   await page.goto('https://circula-qa-challenge.vercel.app/users/sign_up');

  //   const countryDropdown = page.getByLabel('Where’s your company registered?');
  //   await countryDropdown.click();
  //   await page.getByRole('option', { name: 'Sweden' }).click();

  //   await expect(countryDropdown).toHaveText(/Sweden/);
  // });
});
