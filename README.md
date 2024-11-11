# TradeMe-Test Automation Project

## Project Overview

This project is an automation framework built with WebdriverIO, designed to test both the UI and API of the Trade Me sandbox site. It includes UI tests for property searches and API tests for verifying car brands.

## Prerequisites

- **Node.js** (version 18.20.0 or higher)
- **npm** (version 6 or higher)
- **Allure Commandline** (Optional, for viewing Allure reports)

To install the Allure CLI globally, run:

```bash
npm install -g allure-commandline --save-dev
```

## Installation

1. **Clone the Repository**:

```bash
git clone <repository-url>
cd TradeMe-Test
```

2. **Install Dependencies**:
   Run the following command to install all necessary packages:

```bash
npm install
```

## Project Structure

- **`pages/`**: Contains page objects for UI tests.
- **`test/specs/`**: Holds test cases, organized into `ui` and `api` folders.
- **`test/data/`**: (Optional) Contains test data files if needed.
- **`reports/`**: Stores JUnit XML reports for CI/CD integration.
- **`allure-results/`**: Stores raw Allure data for generating detailed HTML reports.

## VSCode Project Settings

To maintain a consistent development experience, project-specific settings are configured in `.vscode/settings.json`. These settings ensure consistent formatting, linting, and TypeScript validation.

- **Automatic Formatting on Save**: Ensures code is formatted every time you save a file.
- **Code Style and Linting**: Enforces consistent code style with ESLint and Prettier.
- **TypeScript Validation**: Enables TypeScript validation and includes specific configuration for project dependencies.

### Explanation of Key Settings

- **`editor.formatOnSave`**: Automatically formats files on save.
- **`editor.tabSize`** and **`editor.insertSpaces`**: Sets indentation to 2 spaces and uses spaces instead of tabs.
- **`eslint.enable`** and **`eslint.validate`**: Enables ESLint for JavaScript and TypeScript files.
- **`editor.codeActionsOnSave`**: Applies ESLint fixes automatically on save.
- **`typescript.tsdk`**: Points to the local TypeScript version in `node_modules`.
- **`typescript.validate.enable`** and **`javascript.validate.enable`**: Enables TypeScript and JavaScript validation.
- **`editor.defaultFormatter`**: Specifies Prettier as the default code formatter.
- **`editor.codeLens`** and **`typescript.referencesCodeLens.enabled`**: Enables CodeLens for quick access to references and information in the code.

## Configuration

All configuration settings for WebdriverIO are in `wdio.conf.ts`. Key configurations include:

- **Test Framework**: Mocha
- **Reporters**: Spec, Allure, JUnit
- **Browser Capabilities**: Chrome, Firefox (adjust as necessary)
- **Timeouts** and **Retries**: Configured for stable and resilient test execution

## Running Tests

### Run All Tests

```bash
npm run test
```

### Running a Specific Test File

You can target a specific test file by providing the file path:

```bash
npx wdio run ./test/specs/ui/searchProperty.spec.ts
```

## Viewing Reports

### Spec Reporter (Console Output)

The Spec Reporter provides immediate feedback in the console.

### Allure Report

To generate and view the Allure report:

1. **Generate the Report**:

```bash
allure generate allure-results --clean -o allure-report
```

2. **Open the Report**:

```bash
allure open allure-report
```

### JUnit Report

JUnit XML reports are generated in `reports/junit-results`.  
These are especially useful for CI/CD integrations, where the reports can be parsed to display in CI dashboards.

## Writing Tests

UI tests are located in `test/specs/ui/`.  
Each test file follows the Page Object Model, ensuring reusable and maintainable code.

- **Example**: `searchProperty.spec.ts` navigates to the Trade Me sandbox site,  
  performs a search for "house," selects a category and region, and verifies listings.

### API Tests

API tests are in `test/specs/api/`.  
Each API test follows best practices for validating responses, structure, and data.

- **Example**: `verifyCarBrands.spec.ts` calls the Trade Me API to fetch car brands and verifies the count.

## Best Practices

- **Page Object Model**: All UI interactions are abstracted into page objects located in `pages/`.
- **Data-Driven Testing**: Keep test data in `test/data/` for easy updates and scalability.
- **Logging and Screenshots**: Automatically capture screenshots on test failures for quick debugging.
- **Error Handling**: Configured timeouts and retries ensure test stability.

## Additional Notes

- **Test Consistency**: Tests may occasionally fail if dynamic data (e.g., listing count) changes on the sandbox site.  
  Such failures are expected and acceptable.
- **Environment Variables**: If sensitive data is required, use a `.env` file to store environment-specific variables (optional).

## Contributing

Please follow the standard Git workflow for submitting contributions:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a Pull Request.

## Troubleshooting

- **Dependencies**: Ensure all dependencies are installed with `npm install`.
- **Node Version**: Confirm that Node.js is version 18.20.0 or higher.
