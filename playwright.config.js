// playwright.config.js
module.exports = {
    testDir: './tests',
    timeout: 30000,     
    use: {
      headless: false,   
      viewport: { width: 1280, height: 800 },
      browserName: 'chromium',
      baseURL: 'https://circula-qa-challenge.vercel.app/users/sign_in', 
    },
  };