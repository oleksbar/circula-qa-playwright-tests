const { expect } = require("@playwright/test");

class SignUpPage {
  constructor(page) {
    this.page = page;
    this.countryInputSelector = 'input[name="country"]';
    this.countryDropdownSelector =
      '[data-testid="autocomplete-menu-portal"] li';
  }

  // Due to "transparent or off-screen overlay" use the browser context to perform the click
  async selectCountryDropdownOption(label) {
    await this.page.locator(this.countryInputSelector).click();

    await this.page.waitForTimeout(1000);

    await this.page.fill(this.countryInputSelector, label); // Trigger filtering
    await this.page.waitForSelector(this.countryDropdownSelector, {
      state: "visible",
    });

    // Get the locator for "Sweden"
    const swedenOption = this.page.locator(
      'div[data-testid="autocomplete-menu-portal"] li:has-text("Sweden")'
    );

    // Wait until it's stable
    await this.page.waitForTimeout(1000); // allow animations to settle

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
  }

  async expectSelectedCountryValue(label) {
    await expect(this.page.locator(this.countryInputSelector)).toHaveValue(
      label
    );
  }
}

module.exports = { SignUpPage };
