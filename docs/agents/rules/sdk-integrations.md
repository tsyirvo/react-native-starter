# SDK integrations

## Ownership and lifecycle

Keep concrete SDK calls in their existing `src/infra/` adapters. Application
composes app-wide lifecycle workflows; features orchestrate user-facing flows.
Reuse adapter APIs instead of importing the vendor SDK throughout the app.
Do not add a new port simply to wrap one existing adapter.

Handle failures through the existing logger/monitoring APIs with useful,
non-sensitive context. Never log tokens, credentials or customer payloads.
Clean up subscriptions and resources, and prevent late async results from
updating an unmounted consumer.

## User-bound integrations

- Inspect current identity workflows and their tests before changing SDK lifecycle behavior.
- Serialize SDK identity transitions. Read user-specific data and attach account-scoped listeners only after the SDK identity matches the intended session.
- Associate async results with their originating identity. Discard obsolete completions during sign-out or account switches; never let another user's data or entitlements become the current user's state.
- Keep local sign-out possible when remote SDK cleanup fails; handle and report the failure without retaining local access.
- Cover delayed transitions, account switches, stale results, listener cleanup and SDK failures with regression tests. Record behavioral requirements in tests rather than freezing a provider layout or readiness flag in guidance.

Pattern example: `src/testing/__tests__/authSubscription.test.tsx` exercises
identity-bound orchestration. Inspect the current implementation it covers;
the example does not prescribe which provider owns each step.

SDK mocks prove orchestration, not vendor/native functionality. State which
development-build or device checks were possible.
