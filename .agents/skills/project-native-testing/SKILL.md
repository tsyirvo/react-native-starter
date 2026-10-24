---
name: project-native-testing
description: Write, review or debug this starter's React Native component and hook tests using Jest, the $testing wrapper, SDK mocks and colocated stories. Use for native test changes or behavioral regression coverage; not for Maestro execution or SDK upgrades.
compatibility: Requires the repository's Bun dependencies and Jest setup.
metadata:
  author: react-native-starter
---

# Project native testing

1. Read the root `AGENTS.md`, `src/AGENTS.md` and `docs/agents/rules/testing.md` (paths relative to the repository root).
2. Read the target implementation and existing tests completely. Identify the observable behavior and regression to cover.
3. Check `package.json` for the installed RNTL/Jest versions and setup. For query, matcher, interaction, timer or render API details, read [react-native-testing](../react-native-testing/SKILL.md) and its reference matching the installed RNTL major, not the React version. Keep this skill's project workflow authoritative: import through `$testing`, preserve its providers/isolation when using alternative render APIs, and use explicit `act` when external updates require it rather than interpreting upstream advice as a blanket ban.
4. Read [the project test patterns](references/project-patterns.md) and inspect the current shared helpers and their tests. Treat linked tests as examples, not fixed helper contracts. Reuse `$testing` and add only providers/mocks the behavior needs.
5. Write a focused behavior test: await async interactions, assert eventual UI or boundary calls, and cover failure/cleanup paths where relevant. Preserve important behavioral requirements in regression tests rather than documenting internal flags or provider responsibilities as rules. A test must be able to fail against broken code, so add tests only for changed or regression-prone behavior and never to raise a coverage number.
6. Run `bun run test -- --runTestsByPath <test-file>`, then the root quality checks and full Jest suite before handoff.
7. Report exactly what was verified. Mocks do not establish native SDK correctness.

Do not install a second runner, migrate RNTL, rewrite existing tests wholesale
or add a global mock merely to make a failing assertion disappear. Never write
tautological, structure-sensitive or cannot-fail tests; check drafts against
the [test anti-patterns](references/project-patterns.md) and, when reviewing
existing tests, remove or fix matches instead of preserving them.
