# Native test patterns

## Inspect helpers and versions

Read `package.json` and `bun.lock` for installed RNTL/Jest versions, then inspect
`src/testing/index.ts`, `src/testing/utils.tsx`, setup and helper tests. Import
helpers from `$testing`; verify available providers, options and return types
instead of assuming a fixed wrapper contract.

Consult [RNTL documentation](https://callstack.github.io/react-native-testing-library/)
for the installed version. Check whether the render and event APIs you use are
synchronous or asynchronous; do not infer this from the React version alone.
When a task requires another render API, preserve the shared provider and
isolation requirements rather than bypassing them unnoticed.

## Component patterns

Adapt an existing component test to the behavior under test; do not create a
parallel wrapper or copy a test's implementation-specific assumptions.

Use `userEvent.setup()` and await its interactions when full user sequences are
needed. Use `fireEvent` for targeted handler events or unsupported interactions,
checking the installed-version API's async requirements.

## Async behavior and mocks

- Prefer accessible roles/labels/text; use stable test IDs when semantic queries do not identify the behavior.
- Use `findBy*` to wait for appearance and `queryBy*` to check absence.
- Execute interactions once, outside `waitFor`; its callback must only assert.
- Handle timers intentionally; flush pending work as needed and restore real timers.
- Reuse existing setup/mocks for native SDKs. Mock the adapter boundary where practical.
- Isolate query caches and state between tests; do not reuse the production singleton QueryClient.
- Add only providers the behavior needs, after checking what the shared wrapper already supplies.
- Check cleanup, late promises and obsolete identities for lifecycle changes.

## Test anti-patterns to reject

A test exists to fail when behavior is wrong. Check every new or modified test
against these patterns; when reviewing existing tests, flag matches and remove
or fix them rather than preserve them. Never add tests to raise a coverage
number: cover behavior that changed or is regression-prone, and skip tests
when a change has no new observable behavior.

Tautological tests restate the implementation: the expected value is computed
from the same logic the test is supposed to verify, so it can only agree with
the code. Replace derived expectations with fixed values the test owns.

```tsx
// Bad: mirrors the production formula.
expect(formatPrice(490)).toBe(`${(490 / 100).toFixed(2)}`);
// Good: fixed expectation the test owns.
expect(formatPrice(490)).toBe("4.90");
```

Structure-sensitive tests couple to internal arrangement (component tree
shape, internal state, private fields, exact internal call order or
implementation-specific props) instead of observable behavior, so refactors
without behavior change break them. Assert rendered output and boundary calls.

```tsx
// Bad: private props and internal state, invisible to users and boundaries.
expect(input.props.isError).toBe(true);
expect(getInputState().touched).toBe(true);
// Good: rendered outcome and boundary effect.
expect(screen.getByTestId("InputErrorText")).toBeOnTheScreen();
expect(onChangeText).toHaveBeenCalledWith("data");
```

Tests that cannot fail pass regardless of correctness: missing or trivially
true assertions, errors swallowed by try/catch so assertions are silently
skipped, or assertions about a mock's own configured behavior.

```tsx
// Bad: a failed submit skips the assertion inside try; the test still passes.
await act(async () => {
  try {
    await checkout.submit(cart);
    expect(await screen.findByText("Order placed")).toBeOnTheScreen();
  } catch {
    // handled upstream
  }
});
// Good: a broken handler fails the test with its real error.
await act(() => checkout.submit(cart));
expect(await screen.findByText("Order placed")).toBeOnTheScreen();
```

Sanity check before handoff: break the behavior under test in a local working
copy (for example raise an error or rename a boundary call) and confirm the
new test fails; a test that still passes is one of the above.

## Reference tests

These are pattern examples, not a fixed helper or provider design. Inspect their
current implementations and assertions before adapting them. Paths are relative
to the repository root:

- `src/shared/uiKit/input/__tests__/Input.test.tsx`: colocated tests using composed stories.
- `src/testing/__tests__/utils.test.tsx`: wrapper behavior and query isolation.
- `src/application/auth/contexts/authContext/__tests__/AuthContextProvider.test.tsx`: auth orchestration.
- `src/features/subscription/contexts/subscriptionContext/__tests__/SubscriptionContextProvider.test.tsx`: user-bound data and late results.
- `src/testing/__tests__/authSubscription.test.tsx`: cross-provider identity lifecycle.
