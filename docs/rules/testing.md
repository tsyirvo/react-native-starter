# Testing in this repo

Repo rule: it extends [mobile testing](mobile-testing.md) with the commands, helpers and reference tests of this repo.

## Commands

- Run `bun run test`, never `bun test`. Run one file or its neighbors with `bun run test:related <test-file>`. Use `bun run test:coverage` for coverage.
- `jest.config.mjs` sets the worker policy for local runs and CI. Use `--runInBand` only to debug serial execution or isolation.
- Read `jest.config.mjs` before you change mock registration or the setup order.

## Helpers and mocks

- The alias is `$`, so the testing module imports as `$testing`. It re-exports Testing Library, with a `render` that adds the app providers. Read `src/testing/index.ts` and `src/testing/utils.tsx` before you rely on a provider or an option.
- `__mocks__/` at the repo root holds the shared mocks for third-party packages. `src/testing/setup.ts` holds the mocks for the app's own adapters. Set return values in each test, not in a shared factory.
- A test of an adapter that `src/testing/setup.ts` mocks must unmock it, or load the real module with `jest.requireActual`.
- Mock a module at its root, such as `$infra/logger`. A deep import skips the mock.

## Where tests live

- Colocate `__tests__/` and `stories/` with the code they cover. Reuse stories in tests with `composeStories` where it keeps the variants in one place.
- Tests of the test helpers live in `src/testing/__tests__/`. Tests that cross modules live in `src/testing/integration/`.
- Reference tests: `src/testing/__tests__/utils.test.tsx` shows test isolation. `src/testing/integration/authSubscription.test.tsx` shows identity-bound orchestration. Read the current code they cover: they do not fix which provider owns each step.
- Accessibility: unit-test the utils and hooks of `$shared/a11y`. Check screen readers by hand with VoiceOver and TalkBack.

## Skills and device checks

- Load the `project-native-testing` skill for a component or hook test. Its anti-pattern reference lists the tests to reject, with examples.
- `bun run test:e2e` runs the Maestro flow. It needs Maestro, Doppler secrets and a running development build.
- To check a change in the live app, load the `project-device-automation` skill, and `dogfood` for exploratory QA. Report each check that you could not run.

## Enforcement

- `jest.base.mjs` resets the mocks. The rest is review only.
