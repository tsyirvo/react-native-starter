# Test design

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists. The repo's `testing.md` names its commands, harnesses and fixtures.

A test earns its place when it catches a bug. Before you write it, name the bug: a plausible change to the code that makes the test go **red**.

## What gets a test

- A capability that a user or a caller can reach: through the module's public interface.
- A real path that a bug would make visible to users: an error path, an empty list, the end of a page, a late response.
- A bug fix: a test that goes red without the fix.
- A pure rule, a transformer and a schema: a unit test.

A test that only raises coverage does not earn its place. A change with no new behavior gets no new test.

## Each test

- Takes its expected value from an independent source: a literal, a worked example or the spec. It never computes the value with the logic under test.
- Asserts what a caller sees: a return value, the rendered output, state read back through the interface, a call at a system boundary.
- Mocks only at system boundaries: the network, third-party SDKs, time and randomness. The modules the repo owns run for real.
- Checks one behavior. Its name says which.
- Awaits every async result, and runs its assertions on every path.
- Uses the repo's fixtures and builders. A test that needs a new field extends the builder with an override.
- Writes table tests with object rows and `$name` in the title, not positional arrays.

Before you hand off, break the line that a new test covers, run the test, see it go red, then restore the line.

## What fails the bar

- **Tautological**: it asserts what the test set up, such as a mock's own return value.
- **Structure-sensitive**: it asserts how the code works: mock call counts and order, private state, which internal function ran, a snapshot of a whole tree. A refactor breaks it, and a bug passes it.
- **Cannot fail**: no assertion, an assertion in a branch that never runs, an unawaited promise, a `catch` that swallows the assertion, a check that holds for any value, a mock that replaces the code under test.
- **Duplicate**: it asserts the same behavior through the same path as another test.

```ts
// Tautological: the expected value repeats the formula.
expect(formatPrice(490)).toBe(`${(490 / 100).toFixed(2)}`);
// Independent: the test owns the value.
expect(formatPrice(490)).toBe('4.90');
```

Fix such a test so that it asserts an outcome a caller sees, or delete it when another test already covers that outcome. Apply the same bar when you audit an existing suite.

## Enforcement

- Biome `useCalledWith` asks for the arguments of a call, not only the call.
- Biome `noFloatingPromises` catches an unawaited result.
- The rest is review only. A reviewer names the bug that each test catches.
