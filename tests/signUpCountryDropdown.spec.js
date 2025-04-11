// tests/signUpCountryDropdown.spec.js
const { test, expect } = require("@playwright/test");
const { SignUpPage } = require("../pages/SignUpPage");

test.describe("Sign-up a new user with country Sweden and without country", () => {
  test.beforeEach(async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);

    // Go to the sign up page
    await page.goto("https://circula-qa-challenge.vercel.app/users/sign_up");

    // Accept cookies/consent dialog
    const acceptAllButton = page.getByRole("button", { name: "Accept All" });
    await acceptAllButton.click();

    // Sign up - Step 1
    await signUpPage.fillEmailWithUniqueAddress();
    await signUpPage.fillPassword("QWErtz123456!");
    await signUpPage.selectCheckboxAcceptTos();
    await signUpPage.selectCheckboxSendNewsletter();

    // Click the submit button
    await signUpPage.clickSubmitButton();

    // Sign up - Step 2
    await signUpPage.verifyStep2isLoaded();
    await signUpPage.enterFirstName("Oleks");
    await signUpPage.enterLastName("Bar");
    await signUpPage.enterPhoneNumber("0123456789");

    // Click the submit button
    await signUpPage.clickSubmitButton();

    // Sign up - Step 3
    await signUpPage.verifyStep3isLoaded();
    await signUpPage.fillCompanyName("QA test");
  });

  test("should sign up a user with Sweden country selected", async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.selectCountryDropdownOption("Sweden");
    await signUpPage.selectHdyhauDropdownOption(
      "Social Media (LinkedIn, Instagram, etc.)"
    );

    // Click the submit button
    await signUpPage.clickSubmitButton();

    // Verify user signed up successfully
    await signUpPage.verifySignUpSuccessWindow();
  });

  test('should suggest to contact us when not listed country is filled in', async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.fillNotListedCountry("China")
  });
});
