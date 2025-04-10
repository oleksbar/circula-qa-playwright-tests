// playwright.config.js
module.exports = {
    testDir: './tests',
    timeout: 8000,     
    use: {
      headless: false,   
      browserName: 'chromium', 
    },
  };