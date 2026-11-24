# Testing

The starter has unit and component tests with [Jest](https://jestjs.io/) and
[React Native Testing Library](https://callstack.github.io/react-native-testing-library/),
and end-to-end (E2E) tests with [Maestro](https://maestro.dev/).

## Unit and component tests

Run all the tests:

```sh
bun run test
```

> **Note:** always use `bun run test`. The `bun test` command starts Bun's own
> test runner, not Jest.

Other useful commands:

```sh
bun run test:related <test-file>               # run the tests related to a file
bunx jest --watch                              # run again when files change
bun run test:coverage                          # include coverage
bunx jest --runInBand                          # run one test at a time, to debug
bunx jest --maxWorkers=4                       # try a different worker count
```

### Write tests

- Put tests in a `__tests__/` folder next to the code that they test.
- React Native Testing Library v14 uses `test-renderer`. Its render, hook and
  event helpers are async, so `await` them.
- Keep `test-renderer` on the same minor version as React (React 19.3 uses
  1.3), and on the version that `jest-expo` installs.

### How Jest runs

- Local runs, the pre-commit hook and CI use the same `jest.config.mjs`.
- Jest uses one worker less than the CPU count, at most 8. Above 8 workers,
  the suite gets no faster. Measure again when the suite or the CI hardware
  changes.
- Jest keeps a transform cache in `node_modules/.cache/jest`. The cache does
  not skip tests. The Jest cache workflow saves the cache on each push to
  `main`, and the Quality workflow restores it, so each pull request starts
  warm.
- A full run fails if Jest finds no tests. The pre-commit hook permits a run
  with no matching tests.

### Jest config

[jest.config.mjs](../../jest.config.mjs) spreads `jest.base.mjs`. Do not edit
the base: it sets the shared options.

- `clearMocks` and `restoreMocks`. Before each test, Jest clears the calls of
  every mock and puts back every `jest.spyOn` and `jest.replaceProperty`. A
  `jest.fn` keeps its implementation. Create a spy in `beforeEach` or in the
  test, never at module scope. To check calls made at import time, copy
  `mock.calls` at module scope.
- `maxWorkers`: one less than the CPU count, at most 8.
- `cacheDirectory`: `node_modules/.cache/jest`. CI restores this folder.
- `modulePathIgnorePatterns`: the native ios and android folders, which
  `expo run` writes. Jest does not crawl them or run the tests they contain.

`jest.config.mjs` adds only what this app needs: its alias, its setup files,
its coverage scope and its resolver. To add a setup file, spread `SETUP_FILES`
from the base. To transform more ESM packages, pass them to
`transformIgnorePatterns([...])`.

### Coverage

Coverage includes the app code in `src/` and the scripts in `scripts/`. It
does not include type declarations, tests, test helpers, stories or
`*.types.ts` files. Root and native configuration files are also not included.

## End-to-end tests

The Maestro flows are in `e2e/`. They run on iOS and Android.

1. [Install Maestro](https://docs.maestro.dev/getting-started/installing-maestro).
2. Build the development app and install it on a simulator or emulator. Read
   [Getting started](getting-started.md#run-the-app).
3. Start the packager with `bun run dev`.
4. Run the flows:

   ```sh
   bun run test:e2e
   ```

The E2E command uses the Doppler `dev` config, so Doppler must be set up.
