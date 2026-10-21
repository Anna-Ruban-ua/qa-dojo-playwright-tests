# Test generation (plan → generate → heal)

End-to-end workflow for authoring and maintaining Playwright tests with `playwright-cli`. Every `playwright-cli` action emits the equivalent Playwright TypeScript, and that generated code is the raw material for every test. The sections below can be used independently:

- **How generation works** — the core mechanic everything else relies on: actions become TypeScript, plus how to add assertions.
- **Plan** — explore the app, produce a plan file describing what to test.
- **Generate** — turn a plan into Playwright test files. Update the plan if it's vague or stale.
- **Heal** — diagnose failing tests, fix the code, reconcile the plan with reality.

Plan / generate / heal lean on the same mechanic: run `npx playwright test --debug=cli` in the background, then `playwright-cli attach tw-XXXX` to drive the paused page interactively. See [playwright-tests.md](playwright-tests.md) for the debug/attach mechanics.

---

## 0. How generation works

Every action you perform with `playwright-cli` generates corresponding Playwright TypeScript code. This code appears in the output and can be copied directly into your test files.

```bash
# Start a session
playwright-cli open https://example.com/login

# Take a snapshot to see elements
playwright-cli snapshot
# Output shows: e1 [textbox "Email"], e2 [textbox "Password"], e3 [button "Sign In"]

# Fill form fields - generates code automatically
playwright-cli fill e1 "user@example.com"
# Ran Playwright code:
# await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');

playwright-cli fill e2 "password123"
# Ran Playwright code:
# await page.getByRole('textbox', { name: 'Password' }).fill('password123');

playwright-cli click e3
# Ran Playwright code:
# await page.getByRole('button', { name: 'Sign In' }).click();
```

### Building a test file

Collect the generated code into a Playwright test:

```typescript
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  // Generated code from playwright-cli session:
  await page.goto('https://example.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Add assertions
  await expect(page).toHaveURL(/.*dashboard/);
});
```

### Use semantic locators

The generated code uses role-based locators when possible, which are more resilient:

```typescript
// Generated (good - semantic)
await page.getByRole('button', { name: 'Submit' }).click();

// Avoid (fragile - CSS selectors)
await page.locator('#submit-btn').click();
```

### Explore before recording

Take snapshots to understand the page structure before recording actions:

```bash
playwright-cli open https://example.com
playwright-cli snapshot
# Review the element structure
playwright-cli click e5
```

### Add assertions manually

Generated code captures actions but not assertions. Add expectations in your test using one of the recommended matchers:

- `toBeVisible()` — element is rendered and visible
- `toHaveText(text)` — element text content matches
- `toHaveValue(value) / toBeEmpty()` — input/select value matches
- `toBeChecked() / toBeUnchecked()` — checkbox state matches
- `toMatchAriaSnapshot(snapshot)` — page (or locator) matches a partial accessibility snapshot

Use `playwright-cli generate-locator <target>` to produce the locator expression for the assertion, and the snapshot/eval commands to capture the expected value.

When asserting text content, make sure that generated locator does not contain text from the element itself. `getByTestId()` or `getByLabel()` usually work well with asserting text. When locator is text-based, prefer `toBeVisible()` instead.

Snapshot to be matched does not have to contain all the information - only capture what's necessary for the assertion. You can use regular expressions for unstable values.

```bash
# Get a stable locator for an element ref to use in the assertion
playwright-cli --raw generate-locator e5
# getByRole('button', { name: 'Submit' })

# Capture expected text content for toHaveText
playwright-cli --raw eval "el => el.textContent" e5

# Capture expected input value for toHaveValue/toBeEmpty
playwright-cli --raw eval "el => el.value" e5

# Capture expected aria snapshot for toMatchAriaSnapshot/toBeChecked
# (whole page, or use a ref to scope to a region)
playwright-cli --raw snapshot
playwright-cli --raw snapshot e5
```

```typescript
// Generated action
await page.getByRole('button', { name: 'Submit' }).click();

// Manual assertions using the outputs above:
await expect(page.getByRole('alert', { name: 'Success' })).toBeVisible();
await expect(page.getByTestId('main-header')).toHaveText('Welcome, user');
await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('user@example.com');
await expect(page.getByRole('checkbox', { name: 'Enable notifications' })).toBeChecked();

// toMatchAriaSnapshot on the whole page, finds a matching region
await expect(page).toMatchAriaSnapshot(`
  - heading "Welcome, user"
  - link /\\d+ new messages?/
  - button "Sign out"
`);

// toMatchAriaSnapshot scoped to a region
await expect(page.getByRole('navigation')).toMatchAriaSnapshot(`
  - link "Home"
  - link /\\d+ new messages?/
  - link "Profile"
`);
```

---

## 1. Planning

Goal: produce a plan file (e.g. `plans/<feature>.plan.md`) that enumerates the scenarios to test. **Always** write the plan to a file.

### 1.1 Prerequisite: workspace

Check the workspace has Playwright installed before anything else:

```bash
# Either of these confirms a workspace:
test -f playwright.config.ts || test -f playwright.config.js
npx --no-install playwright --version
```

If there is no Playwright install, bootstrap one and let the user pick the defaults:

```bash
npm init playwright@latest
```

### 1.2 Prerequisite: seed test

A **seed test** is a minimal test that lands the page in the state every scenario starts from: navigation to the app, any required login, feature flags, etc. Scenarios assume a fresh start *after* the seed. `--debug=cli` pauses *inside* this test, so the seed is where every planning and generation session begins.

Minimum viable seed:

```ts
// tests/seed.spec.ts
import { test } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('https://example.com/');
});
```

Preferred — push navigation into a fixture so scenario tests reuse it:

```ts
// tests/fixtures.ts
import { test as baseTest } from '@playwright/test';
export { expect } from '@playwright/test';

export const test = baseTest.extend({
  page: async ({ page }, use) => {
    await page.goto('https://example.com/');
    await use(page);
  },
});
```

```ts
// tests/seed.spec.ts
import { test } from './fixtures';

test('seed', async ({ page }) => {
  // Fixture already navigates. This empty body tells agents where to start.
});
```

If no seed exists, create one that at least navigates to the app.

### 1.3 Explore the app

Launch the app via the seed in the background and attach:

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/seed.spec.ts --debug=cli
# wait for "Debugging Instructions" and the session name tw-XXXX
playwright-cli attach tw-XXXX
```

Resume so the seed runs, then probe the app:

```bash
playwright-cli resume                   # resume so that seed test runs fully
playwright-cli snapshot                 # inventory of interactive elements
playwright-cli click e5                 # follow a flow
playwright-cli eval "location.href"     # read URL / state
playwright-cli show --annotate          # ask the user to point at something
```

Map out:

- Interactive surfaces (forms, buttons, lists, filters, modals).
- Primary user journeys end-to-end.
- Edge cases: empty states, validation errors, very long input, boundary values.
- Persistence: reload, local/session storage, URL fragments.
- Navigation: which controls change the URL, back/forward behaviour.

**Important**: Do not just open the app url with playwright-cli, always go through the test to capture any custom setup done there.
**Important**: Stop the background test when done exploring.

### 1.4 Write the plan file

Save under `plans/<feature>.plan.md`. Use this structure:

```markdown
# <Feature> Test Plan

## Application Overview

<One paragraph describing what the feature does and why it matters.>

## Test Scenarios

### 1. <Group Name>

**Seed:** `tests/seed.spec.ts`

#### 1.1. <kebab-case-scenario-name>

**File:** `tests/<feature>/<area>.spec.ts`

**Steps:**
  1. <Concrete user step>
    - expect: <observable outcome>
    - expect: <another observable outcome>
  2. <Next step>
    - expect: <outcome>

#### 1.2. <next-scenario>
...

### 2. <Next Group>

**Seed:** `tests/seed.spec.ts`
...
```

Guidelines:

- Each scenario is independent and starts from the seed's fresh state — never chain scenarios.
- Scenario names are kebab-case; the test title is the same name with spaces (`should-add-single-todo` → `test('should add single todo')`).
- Scenarios of one feature area share one test file; see [Project conventions](#25-project-conventions).
- Cover happy path, edge cases, validation, negative flows, persistence.
- Write steps at the user level ("Type 'Buy milk' into the input"), not the API level ("call `fill`").
- Put observable outcomes in `- expect:` bullets; each becomes an assertion during generation.

---

## 2. Generate

Goal: take a plan file and produce Playwright test files. Optionally update the plan if it has drifted.

### 2.1 Inputs

- **Plan file**, e.g. `plans/basic-operations.plan.md`.
- **Target**: either a single scenario (e.g. `1.2`), a whole group (`1`), or all.
- **Seed file**, read from the `**Seed:**` line of the scenario's group.

### 2.2 Generate one scenario

For each target scenario, in sequence (never in parallel — scenarios share the seed session):

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test <seed-file> --debug=cli   # background
playwright-cli attach tw-XXXX
# resume
```

**Do not** just open the app url with playwright-cli, always go through the test to capture any custom setup done there.

Walk the scenario's `Steps:` one by one with `playwright-cli`, treating the plan as the guide and the live app as the source of truth. If a step is vague ("click the button" — which button?), references an element that no longer exists, or contradicts the app's actual behaviour, use your judgement: update the plan to match what the app really does, then keep going. Editing the plan mid-generation is expected.

Every action prints the equivalent Playwright TypeScript (see [How generation works](#0-how-generation-works)):

```bash
playwright-cli snapshot                         # find refs
playwright-cli fill e3 "John Doe"               # -> page.getByRole('textbox', {...}).fill(...)
playwright-cli press Enter
playwright-cli click e7
```

For each `- expect:` bullet, add an explicit assertion. See [How generation works](#0-how-generation-works) for details.

Collect the generated code, move locators and repeated steps into the feature's actions module, and add the test to the file given in the plan (see [Project conventions](#25-project-conventions)):

```ts
import { test, expect } from '@playwright/test';
import { search } from './articles-data';
import { getLocators, openArticlesPage, searchArticles } from './articles-actions';

test.describe('Article Search', () => {
  test('should show empty state when nothing matches', async ({ page }) => {
    const { articlesCounter, emptyState } = getLocators(page);

    await openArticlesPage(page);
    await searchArticles(page, search.noMatchQuery);

    await expect(articlesCounter()).toHaveText(search.noArticlesCounter);
    await expect(emptyState()).toHaveText(search.emptyStateText);
  });
});
```

Rules:

- The describe name is the plan group name without the ordinal; the test title is the scenario name with spaces instead of hyphens.
- If the file already exists, add the new test to the matching `test.describe` instead of creating a new file.
- **No comments in tests**: no `// spec:` / `// seed:` headers, no step comments. A comment is allowed only to explain non-obvious logic in a complex helper function, and even then prefer clearer naming.
- Import from `@playwright/test`.
- **Important**: close the CLI session and stop the background test before moving to the next scenario.

### 2.3 Generate multiple scenarios

Loop 2.2 over the targeted scenarios one at a time, restarting the seed between each so every test starts from a clean page. Make sure each test run is stopped before starting the next one.

### 2.4 Run generated tests

After generation, run the new tests once:

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/<feature>/<area>.spec.ts -g "<test title>"
```

Any failure goes to Section 3.

### 2.5 Project conventions

```
tests/
  seed.spec.ts                    # agents' entry point; navigation and shared setup only
  shared/paths.ts                 # app paths
  <feature>/
    <area>.spec.ts                # many tests per file, one file per feature area
    <feature>-actions.ts          # getLocators(page) + step helpers (open…Page, fill…, search…)
    <feature>-data.ts             # constants, expected texts, test data generators
```

- A feature folder may hold several spec files (`tests/articles/articles.spec.ts`, `tests/articles/article-search.spec.ts`); they share the folder's actions and data modules.
- Locators live only in `getLocators(page)`, never inline in tests. Prefer `getByTestId`; the app has `data-testid` on most controls. Otherwise use role locators.
- Paths come from `tests/shared/paths.ts`; feature strings and data from `<feature>-data.ts`. Reuse another feature's helpers by import (e.g. `../auth/auth-actions`).
- The test server is shared and its data persists between runs: never assert absolute counts (articles, users). Compare with a value read in the same test, or create unique data and assert on it.
- Kept as written, as coursework examples of earlier styles; do not refactor: `tests/auth/auth.spec.ts`, `tests/auth/auth-variables.spec.ts`, `tests/voting-age/voting-age.spec.js`, `tests/laboratory/sortable-table-x-pass.spec.ts`.

---

## 3. Heal

Goal: fix failing tests, and update the plan if the app's intended behaviour changed.

### 3.1 Find failing tests

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test
```

Record the list of failing `<file>:<line>` entries and process them one at a time. Do not attempt parallel fixes — shared state and the single CLI session make that fragile.

### 3.2 Debug one failure

Run the single failing test in debug mode in the background, then attach:

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test tests/<feature>/<area>.spec.ts:<line> --debug=cli
# wait for "Debugging Instructions" and the tw-XXXX session name
playwright-cli attach tw-XXXX
```

The test is paused at the start. Step forward or run to until just before the failing action or assertion, then diagnose:

```bash
playwright-cli snapshot                # did the element change / move / rename?
playwright-cli console                 # app-side errors?
playwright-cli requests                # failed request? wrong payload?
playwright-cli show --annotate         # ask the user to point somewhere
```

Common causes: selector drift, new wrapper element, label/ARIA rename, timing (transition, async load), assertion text updated in the app, test data leaking between runs.

Rehearse the corrected interaction with `playwright-cli` — the generated code in the output is what you paste back into the test.

### 3.3 Apply the fix

Edit the test file: update the locator, assertion, step order, or inputs to match the corrected behaviour. Stop the background debug run. Rerun the single test to confirm green.

Never skip hooks or add sleeps as a fix. Never use `networkidle`.

### 3.4 Reconcile with the plan

Find the plan in `plans/` whose `**File:**` line points to the test file, and the scenario whose name matches the test title.

- **Fix was purely technical** (locator drift, better assertion shape) and the plan's user-level behaviour still matches the app → leave the plan alone.
- **Fix changed user-visible steps, inputs, order, or expected outcomes** that the plan describes → update the plan to match reality. Keep the scenario id and file path stable; only the step / expect lines change.
- **Unclear whether the app change is intentional** (plan is stale) **or a regression** (test was right, app is wrong) → **stop and ask the user**. Provide:
  - the scenario id (e.g. `2.3`),
  - the plan lines that no longer match,
  - the observed app behaviour (quote a snapshot excerpt or a concrete outcome).

Only after the user answers, either update the plan (intentional change) or file/flag the test as covering a bug (regression).

### 3.5 Iteration and giving up

- Fix failures one at a time; rerun after each.
- If after thorough investigation you are confident the test is correct but the app is wrong *and* the user has confirmed it's a bug: add `test.fixme(true, '<what happens instead, decision or issue link>')` as the first line of the test body; no comment. Never silently skip.

---

## Cross-references

| For... | See |
|---|---|
| `--debug=cli` / attach mechanics | [playwright-tests.md](playwright-tests.md) |
| Mocking requests during exploration/generation | [request-mocking.md](request-mocking.md) |
| Managing the CLI browser session | [session-management.md](session-management.md) |
