# State and data

## State ownership

- Use TanStack Query for server state and caching.
- Use the existing Zustand store for shared client state; keep feature-local transient state local where possible.
- Inspect current slices, session workflows and consumers before extending state. Keep a single authority for each value rather than duplicating it across stores, providers and query caches.
- Do not persist session data or credentials as an incidental change; establish the security and cleanup requirements first.

## Query and storage conventions

Reuse the existing query client and configured error handling/invalidation;
inspect their behavior before extending them. Do not create a second global
query client, change retry policy globally, or add a new request client as an
incidental change.

Inspect the existing persistence adapters before changing storage. Persist
only deliberately selected data and exclude transient state. Consider schema
and cache compatibility, migrations and user-data cleanup when changing
persisted data; cover these requirements in tests.

For networking tasks, load `expo-data-fetching` after reading these constraints.
Show loading/error/empty/content states; keep cached content during refetches
and preserve input on failed saves. Validate response assumptions and consume
cancellation signals where supported.

## Contracts and session safety

Read the current implementation, tests and documented limitations before
assuming backend authentication, session restoration, token refresh or offline
support. Do not invent a backend contract, treat a stored token as proof of a
valid session, or equate query persistence with offline writes.

When changing session behavior, identify which state, caches, storage and
credentials must be cleared or isolated. Test sign-out and account switches
so one user's data cannot become another user's state.

Use existing runtime configuration instead of copying generic environment
examples. Values shipped in the client bundle are public; non-prefixed
environment names alone do not make an app-bundled value secret.

## Inspection examples

Inspect current code and tests; these paths are starting points, not fixed
inventories or required implementations:

- `src/infra/api/queryClient.ts`: query configuration.
- `src/infra/store/` and `src/infra/storage/`: state and persistence conventions.
