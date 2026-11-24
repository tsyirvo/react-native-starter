# Mobile testing

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists. [Test design](test-design.md) sets the bar for every test. The repo's `testing.md` names its commands and its builders.

## Harness

- Jest with the `jest-expo` preset and React Native Testing Library. Run tests with `bun run test` or `bun run test:related <paths>`, never `bun test`: that is Bun's own runner.
- Import `render`, `screen`, `userEvent` and the builders from the testing module `@/testing`, never from `@testing-library/react-native`. The testing module adds the providers that the app needs.
- Check the installed RNTL major in `package.json` before you choose an API. Load the `react-native-testing` skill for queries, matchers and events.

## Jest base config

The repo's `jest.config.mjs` spreads `jest.base.mjs`, which comes from a shared source. The base sets:

- `clearMocks` and `restoreMocks`. Before each test, Jest clears the calls of every mock and puts back every `jest.spyOn` and `jest.replaceProperty`. A `jest.fn` keeps its implementation. So create a spy in `beforeEach` or in the test, never at module scope. To check a call made at import time, copy `mock.calls` at module scope.
- `maxWorkers`: one less than the CPU count, at most 8.
- `cacheDirectory`: `node_modules/.cache/jest` in the app folder. CI restores it.
- `modulePathIgnorePatterns`: the native `ios` and `android` folders that `expo run` writes.

The repo config adds only its aliases, its setup files, its coverage scope and its ESM packages. To add a setup file, spread `SETUP_FILES` from the base.

## Components and hooks

- Render the component and drive it as a user does: `userEvent` for full sequences, `fireEvent` for one handler.
- Find elements by role, label or text. Use a `testID` only when no accessible query identifies the element.
- Use `findBy*` to wait for an element and `queryBy*` to assert that it is absent.
- Act once, outside `waitFor`. The `waitFor` callback only asserts.
- Test a hook with logic through `renderHook`, by its returned values and actions.
- Test a disabled control by trying the action and asserting that nothing happens.
- Do not assert styles, layout or accessibility props. Unit-test the repo's accessibility helpers, and check screen readers by hand with VoiceOver and TalkBack.

## Mocks

- Mock at the adapter: the module that wraps the SDK, not each function inside the app.
- A mock that several test files need lives once, in the testing module's setup or in the app's `__mocks__/` folder. Read both before you add a `jest.mock`. A mock that one file needs stays in that file.
- Prefer an in-memory adapter to a hand-written mock of the same thing.
- `jest.mock` replaces only the path it names. Mock a module at the path the code imports, usually its `index.ts`.
- A mock of a barrel spreads `jest.requireActual(...)` and replaces only what the test needs. A factory that lists the exports by hand breaks when the barrel gains an export.
- Give each test its own query cache and store state. Never reuse the app's singleton query client.
- Use fake timers on purpose, and restore real timers after the test.

## Identity and lifecycle

For code that depends on the signed-in user, test a delayed identity change, an account switch, a late result for a previous user, listener cleanup and an SDK failure.

## Beyond Jest

- A Jest test with mocks proves the JavaScript behavior. It does not prove a native SDK, the other platform or a release build. Report the native checks you could not run.
- A run on a simulator with agent-device is evidence for one device and one build. It is not a regression test. Keep durable flows in Maestro or Jest.

## Enforcement

- The repo's `biome.jsonc` rejects a direct import of `@testing-library/react-native` outside the testing module, and an import of `@/testing` outside test files and the Jest setup.
- `jest.base.mjs` sets the mock reset.
- The rest is review only.
