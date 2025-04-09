// playwright.config.js
module.exports = {
    testDir: './tests', // Specify the folder where tests are located
    timeout: 30000,     // Set a test timeout (optional)
    use: {
      headless: true,   // Run tests in headless mode (no UI)
      browserName: 'chromium', // Use Chromium by default
    },
  };