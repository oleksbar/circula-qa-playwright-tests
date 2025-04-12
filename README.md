# 🔍 Playwright Test Automation Project

This project uses [Microsoft Playwright](https://playwright.dev/) for end-to-end (E2E) testing of a web application using JavaScript.

## 📦 Tech Stack

- 🎭 [Playwright](https://playwright.dev/) – for browser automation
- 💻 JavaScript (ES6+)
- 🧪 Playwright Test Runner
- 🗂 Page Object Model (POM) structure

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-playwright-project.git
cd your-playwright-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```


🧪 Running Tests

### 1.  Run all tests:

```bash
npx playwright test
```

### 2. Run a specific test file:
```bash
npx playwright test tests/signup.spec.js
```

### 3.  Run tests with UI (headed mode):

```bash
npx playwright test --headed
```

### 4.  Watch mode:

```bash
npx playwright test --watch
```

## ⚙️ Playwright Config

You can update test settings in playwright.config.js, e.g.:

- base URL
- timeouts
- browser options
- retries
- reporter setup