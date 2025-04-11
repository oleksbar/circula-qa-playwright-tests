const { expect } = require("@playwright/test");

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.emailFieldSelector = 'input[name="email"]';
    this.passwordFieldSelector = 'input[name="password"]';
    this.countryInputSelector = 'input[name="country"]';
    this.countryDropdownSelector =
      '[data-testid="autocomplete-menu-portal"] li';
    this.hdyhauInputSelector = 'input[name="hdyhau"]';
    this.hdyhauDropdownOptionSocialMediaSelector =
      'div[data-valuetext="Social Media (LinkedIn, Instagram, etc.)"]';
    this.checkboxAcceptTosSelector = 'input[name="acceptTos"] >> xpath=..';
    this.checkboxSendNewsletterSelector =
      'input[name="sendNewsletter"] >> xpath=..';
    this.submitButtonSelector = 'button[type="submit"]';
    this.step2labelSelector = "text=Your contact details";
    this.firstNameSelector = 'input[name="firstname"]';
    this.lastNameSelector = 'input[name="lastname"]';
    this.phoneNumberSelector = 'input[name="phoneNumber"]';
    this.step3labelSelector = "text=Company information";
    this.companyNameSelector = 'input[name="organizationName"]';
    this.signUpSuccessSelector = 'div[data-testid="signup-success"]';
  }

  // Fills the email field with a unique email based on current date and time
  async fillEmailWithUniqueAddress(
    prefix = "oleks",
    domain = "circulatest.com"
  ) {
    const now = new Date();

    const pad = (num) => String(num).padStart(2, "0");
    const monthShort = now
      .toLocaleString("en-US", { month: "short" })
      .toLowerCase();
    const day = pad(now.getDate());
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());

    const timestamp = `${monthShort}${day}-${hour}${minute}${second}`;
    const uniqueEmail = `${prefix}+${timestamp}@${domain}`;

    await this.page.fill(this.emailFieldSelector, uniqueEmail);
    return uniqueEmail;
  }

  //Fill password
  async fillPassword(passsword) {
    await this.page.fill(this.passwordFieldSelector, passsword);
  }

  // Select checkbox 'acceptTos' (by clicking on the top left corner of the element since there are hyperlinks in the text)
  async selectCheckboxAcceptTos() {
    const element = await this.page.locator(this.checkboxAcceptTosSelector);
    const boundingBox = await element.boundingBox();
    await this.page.mouse.click(boundingBox.x, boundingBox.y);
  }

  // Select checkbox 'sendNewsletter'
  async selectCheckboxSendNewsletter() {
    await this.page.locator(this.checkboxSendNewsletterSelector).check();
  }

  // Click the submit button
  async clickSubmitButton() {
    await this.page.locator(this.submitButtonSelector).click();
  }

  // Check that Step 2 is loaded successfully
  async verifyStep2isLoaded() {
    await expect(this.page.locator(this.step2labelSelector)).toBeVisible({
      timeout: 5000,
    });
  }

  // Enter first name
  async enterFirstName(firstName) {
    const firstNameInput = this.page.locator(this.firstNameSelector);
    await expect(firstNameInput).toBeVisible();
    await firstNameInput.fill(firstName);
  }

  // Enter last name
  async enterLastName(lastName) {
    await this.page.fill(this.lastNameSelector, lastName);
  }

  // Enter a number
  async enterPhoneNumber(phoneNumber) {
    await this.page.fill(this.phoneNumberSelector, phoneNumber);
  }

  // Check that Step 3 is loaded successfully
  async verifyStep3isLoaded() {
    await expect(this.page.locator(this.step3labelSelector)).toBeVisible();
  }
  // Fill company name
  async fillCompanyName(companyName) {
    await this.page.fill(this.companyNameSelector, companyName);
  }

  // Due to "transparent or off-screen overlay" use the browser context to perform the click
  async selectCountryDropdownOption(label) {
    await this.page.locator(this.countryInputSelector).click();
    await this.page.waitForTimeout(1000);
    await this.page.fill(this.countryInputSelector, label); // Trigger filtering
    await this.page.waitForSelector(this.countryDropdownSelector, {
      state: "visible",
    });

    // Wait until it's stable
    await this.page.waitForTimeout(1000);

    // Due to "transparent or off-screen overlay" use the browser context to perform the click
    await this.page.evaluate((label) => {
      const items = this.document.querySelectorAll(
        '[data-testid="autocomplete-menu-portal"] li'
      );
      for (const item of items) {
        if (item.textContent?.trim() === label) {
          item.click();
          return;
        }
      }
      throw new Error(`Option "${label}" not found in dropdown`);
    }, label);

    // Verify the selected value in the field
    await expect(this.page.locator(this.countryInputSelector)).toHaveValue(
      label
    );
  }

  //Select hdyhau option
  async selectHdyhauDropdownOption(label) {
    // Click on the hdyhau select field
    await this.page.locator(this.hdyhauInputSelector).click();

    // Select value: Social Media (LinkedIn, Instagram, etc.)
    await this.page
      .locator(this.hdyhauDropdownOptionSocialMediaSelector)
      .click();

    // Verify the selected value in the field
    await expect(this.page.locator(this.hdyhauInputSelector)).toHaveValue(
      label
    );
  }

  //Verify sign up success window
  async verifySignUpSuccessWindow() {
    const successBox = this.page.locator(this.signUpSuccessSelector);
    await expect(successBox).toBeVisible();
    await expect(successBox.getByText("Great! Now please verify your email")).toBeVisible();
  }
}

module.exports = { SignUpPage };
