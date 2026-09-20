# QA Dojo — E2E tests

End-to-end tests in TypeScript + Playwright for the QA Dojo demo application,
written as coursework for a QA automation course.

Current scope: registration and login (`tests/auth.spec.ts`, tag `@auth`).

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npx playwright test                      # all tests
npx playwright test tests/auth.spec.ts   # one file
npx playwright test --grep @auth         # by tag
npx playwright test --headed             # with a visible browser
```

## Report

```bash
npx playwright show-report
```

Traces are kept for failed tests (`trace: 'retain-on-failure'`) and open from
the report, or directly:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

## Configuration

`playwright.config.ts` — base URL, Chromium project, HTML reporter,
retries and single worker on CI.

CI runs on GitHub Actions (`.github/workflows/playwright.yml`).
