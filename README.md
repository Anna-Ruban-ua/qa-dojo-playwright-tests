# QA Dojo — E2E tests

End-to-end tests in TypeScript + Playwright for the QA Dojo demo application,
written as coursework for a QA automation course.

Covered: registration and login, article creation and search, the feedback
form, a sortable table, and a voting-age function.

## Setup

```bash
npm install
npx playwright install
echo "BASE_URL=<app url>" > .env
```

The tests open the app at `BASE_URL`; on CI it comes from the repository
variable `BASE_URL`.

## Run

```bash
npx playwright test                              # all tests
npx playwright test tests/articles               # one feature
npx playwright test tests/auth/auth.spec.ts      # one file
npx playwright test --grep @auth                 # by tag
npx playwright test --headed                     # with a visible browser
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

## Structure

```
tests/            one folder per feature, plus seed.spec.ts (start point for the test agents)
plans/            test plans: what each feature's tests check
.claude/agents/   Claude Code agents: test planner, generator, healer; docs review
```

Test file conventions: `.claude/skills/playwright-cli/references/test-generation.md`, section 2.5.

The agents drive the browser with `playwright-cli`
(`npm install -g @playwright/cli`).

## Configuration

`playwright.config.ts` — base URL, Chromium project, HTML reporter,
retries and single worker on CI.

CI runs on GitHub Actions (`.github/workflows/playwright.yml`).
