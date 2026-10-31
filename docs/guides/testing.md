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
bun run test -- --runTestsByPath <test-file>   # run one test file
bun run test -- --watch                        # run again when files change
bun run test:coverage                          # include coverage
bun run test -- --runInBand                    # run one test at a time, to debug
bun run test -- --maxWorkers=4                 # try a different worker count
```

### Write tests

- Put tests in a `__tests__/` folder next to the code that they test.
- React Native Testing Library v14 uses `test-renderer`. Its render, hook and
  event helpers are async, so `await` them.
- Keep `test-renderer` on the same minor version as React (React 19.3 uses
  1.3), and on the version that `jest-expo` installs.

### How Jest runs

- Local runs, the pre-push hook and CI use the same `jest.config.js`.
- Jest uses half of the available CPUs, from 1 to 6 workers. On a 14-core
  computer, the full suite was fastest with 4 to 8 workers. Measure again when
  the suite or the CI hardware changes.
- Jest keeps a transform cache in `node_modules/.cache/jest`. The cache does
  not skip tests. The Quality workflow restores the cache from earlier runs.
- A full run fails if Jest finds no tests. The pre-commit hook permits a run
  with no matching tests.

### Coverage

Coverage includes the app code in `src/` and the scripts in `scripts/`. It
does not include type declarations, tests, test helpers, stories or
`*.types.ts` files. Root and native configuration files are also not included.

## End-to-end tests

The Maestro flows are in `e2e/`. They run on iOS and Android.

1. [Install Maestro](https://docs.maestro.dev/getting-started/installing-maestro).
2. Build the development app and install it on a simulator or emulator. Read
   [Getting started](getting-started.md#run-the-app).
3. Start the packager with `bun run start:dev`.
4. Run the flows:

   ```sh
   bun run test:e2e
   ```

The E2E command uses the Doppler `dev` config, so Doppler must be set up.
