---
paths:
  - "CLAUDE.md"
  - "AGENTS.md"
  - "README*"
  - "docs/**"
  - "plans/**"
  - ".claude/**"
---

# Documentation rules

## Writing

- English only; quoted UI strings stay in their own language.
- One place per fact: search the docs before writing, and point to the existing place instead of repeating it.
- Only what the code, config or `package.json` does not show; no tutorials on standard tools.
- Short and exact: plain statements, exact names of files, commands and ids. No history, no analogies, no filler. A code example only where it is shorter than the words.
- Every claim is checked against the code: the command runs, the path exists.
- A doc, rule, skill or agent appears only when there is something real to say; no empty templates.
- A team decision that contradicts a doc changes the doc.

## Where each fact lives

- `README.md`: what the project is, setup, how to run, structure.
- `plans/<feature>.plan.md`: app behaviour the tests check.
- `CLAUDE.md`: working principles, process, hard rules, invariants that are easy to break.
- `.claude/rules/<area>.md` with `paths:`: rules needed only when touching those files.
- `.claude/skills/<name>/SKILL.md`: how a kind of work is done. Test conventions: `.claude/skills/playwright-cli/references/test-generation.md`, section 2.5.
- `.claude/agents/<name>.md`: a role with its own tools and report.
- Code comments: only the why the code cannot say, next to that code.
- Personal preferences: Claude's memory, not the repo.

## Before a PR

Go over the batch (`git log main..HEAD`) and update every doc the batch made wrong, in one `docs: …` commit. Then run the `docs-review` agent on the changed docs.

## When to add what

- A kind of work done the second time → a skill.
- The same mistake twice, or a review catching an unwritten rule → a `CLAUDE.md` invariant, or a `paths:` rule if it is area-specific.
- A check done by hand before every merge → a reviewer agent or a script.
- An owner decision → recorded at once in the doc it changes.
