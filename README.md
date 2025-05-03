# American Express FR Credit Card Application UI Test Framework

This framework is designed to test the UI elements and flow of the French American Express credit card application process using Playwright and TypeScript.

## Overview

The framework tests the following flow:
1. All Cards page -> Gold Card view more
2. Selected Gold card -> User form
2. Fill form details -> Validate the form completion

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Playwright browsers

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

To run all tests in headless mode:
```bash
npm test
```

To run tests in headed mode:
```bash
npm run test:headed
```

To run tests in debug mode:
```bash
npm run test:debug
```

To view the test report:
```bash
npm run report
```

## Notes

- Tests use dummy data for form filling
- Screenshots and videos are captured on test failures
- Tests include basic validation of UI elements
- Framework supports parallel test execution
- The framework uses TypeScript for type safety and better maintainability
- Page Object Model pattern is used for better code organization and reusability 