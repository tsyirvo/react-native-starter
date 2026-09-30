# Testing

## Commands and helpers

- Use `bun run test`, never `bun test`.
- Focused: `bun run test -- --runInBand --runTestsByPath <test-file>`.
- Full suite: `bun run test -- --runInBand`; coverage: `bun run test:coverage -- --runInBand`.
- Import `render`, `screen` and other native helpers from `$testing`.
- Inspect `$testing` exports, render helpers and their tests before relying on available providers, options or async behavior. Reuse the shared setup and add only the contexts a test needs.
- Use `src/testing/setup.ts`, the Jest configuration in `package.json` and `__mocks__/` before adding another global mock.

## Test design

Load `project-native-testing` for component/hook test work. Check the installed
RNTL version rather than selecting APIs from the React version alone.

Prefer observable behavior and accessible queries. Use `findBy*` for eventual
UI and `queryBy*` for absence. Await async interactions; perform actions before
`waitFor`, not inside its retry callback. Use fake timers deliberately and
restore them. Write tests that can fail against broken code; reject
tautological, structure-sensitive and cannot-fail tests (definitions and
examples in the `project-native-testing` anti-pattern reference).

Colocate `__tests__/` and `stories/` with the owner. Follow existing
`composeStories` usage where it makes UI variants reusable, without making
all tests depend on stories. Mock SDK seams, not every internal function.

For identity-bound integrations, test delayed transitions, account switches,
stale results, listener cleanup and SDK failures. Preserve behavioral
requirements in regression tests without coupling assertions to internal
flags or provider responsibilities.

Pattern examples: `src/testing/__tests__/utils.test.tsx` for test isolation and
`src/testing/__tests__/authSubscription.test.tsx` for identity lifecycle coverage.
Inspect current tests rather than assuming their helpers or scenarios are fixed.

## Verification boundaries

Biome and TypeScript enforce code quality; Jest verifies JS behavior under
mocks. For Maestro, inspect the `test:e2e` script and applicable scenarios;
provide its CLI, required secrets and a development app on a simulator/device.
Native changes also need relevant development-build checks. Clearly report
any tests that could not run instead of silently substituting a mock.
