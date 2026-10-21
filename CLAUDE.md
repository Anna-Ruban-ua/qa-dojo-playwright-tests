# CLAUDE.md

Only what the code does not tell you. Setup, commands and structure: [README.md](README.md). Tested app behaviour: the plans in [plans/](plans/).

## Working principles

- Read the plan in `plans/` and the code before changing tests.
- Ask when a test-scope or product decision is unclear.
- Simplicity first; surgical changes only.
- Done = the affected tests were run and pass.

## Environment and process

- Run tests as `PLAYWRIGHT_HTML_OPEN=never npx playwright test <path>`, otherwise a failure opens the HTML report and the command does not return.
- Browser work goes through `playwright-cli` (skill `playwright-cli`); do not use browser MCP tools (`playwright-test`, `chrome-devtools`) even when they are available.
- Branches: one per homework (`hw-<n>`), PR into `main`.
- Commits: conventional prefixes (`feat`, `fix`, `test`, `refactor`, `docs`, `chore`).
- Before a commit: run every `tests/<feature>/` folder the change touches.
- Documentation rules: [.claude/rules/docs.md](.claude/rules/docs.md).

## Hard rules

- `.claude/skills/playwright-cli/` is `@playwright/cli` 0.1.22 adapted to this project (`references/test-generation.md`, `SKILL.md` description). `playwright-cli install --skills` overwrites it; re-apply the project changes after an update.
