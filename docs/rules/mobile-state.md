# Mobile state and data

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists. The mobile `AGENTS.md` names this app's data hooks and stores.

## Ownership

Choose the owner before the storage:

| State                        | Owner                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------- |
| One screen, not persisted    | The component or the feature hook                                               |
| Server data                  | The data hooks in `application/queries/`, on the backend's client or sync layer |
| App-wide or persisted client | A Legend State store in `infra/store/`, reached through `application/`          |

- Keep one authority for each value. Do not copy it across a store, a provider and a query cache.
- Do not cache reactive backend data a second time in TanStack Query. TanStack Query is for HTTP endpoints that are not reactive.
- Reuse the app's query client and its error handling. Do not create a second client or change the retry policy as a side effect.

## Server data

Each domain has one folder in `application/queries/<domain>/`, with only the files it needs:

| File                     | Holds                                                                      |
| ------------------------ | -------------------------------------------------------------------------- |
| `<domain>.queries.ts`    | The read hooks                                                             |
| `<domain>.mutations.ts`  | The write hooks                                                            |
| `<domain>.requests.ts`   | One-shot calls outside React, such as a prefetch or a call from a workflow |
| `<domain>.keys.ts`       | The cache keys, only for HTTP data that TanStack Query caches              |
| `<domain>.collection.ts` | The sync collection, where the backend syncs through a client collection   |
| `index.ts`               | The public surface of the domain                                           |

- `application/queries/core/` holds the hooks that wrap the backend client and the generic collection code. It is the only folder in `application/queries/` that imports the backend client.
- `application/queries/index.ts` exports each domain. Features import `@/application/queries`.

## Stores

- A store is a folder `infra/store/<name>Store/`: its observables in `<name>.observable.ts`, its hooks and actions in `index.ts`.

- An observable stays private to its store. The store exports one hook for each value that consumers read, and plain functions for the actions. So each write has one owner, and a consumer re-renders only for what it reads.
- Read an observable in render through the store's hook, which reads it with `useValue`. `useSelector` and `use$` are the old names of `useValue`: Legend State removes them in a later version, and `use$` breaks the React Compiler. Never call `.get()` during render. Use `.peek()` outside render.
- Keep persisted and transient values in separate observables. Persist only a value that must survive a restart.
- Each store that holds account data resets on sign-out.
- A persisted name and its value shape are deployed contracts: see [compatibility](compatibility.md).
- When the `legend-state-best-practices` skill is installed, load it for selectors, persistence and sync.

## Identity and sessions

- Run SDK identity changes, such as sign-in, sign-out and account switch, one at a time.
- Read user data and attach account listeners only after the SDK identity matches the session.
- Tie each async result to the identity that started it. Drop a result that arrives for a previous user.
- Sign-out works locally even when a remote SDK call fails. Report the failure, and keep no access.
- On sign-out, clear each store, cache and secure value that belongs to the account.
- A stored token is not proof of a valid session. Query persistence is not offline writes.

## Secrets and config

- Values in the client bundle are public, whatever their name. Server credentials stay on the server.
- Read runtime config through the repo's config adapter, not through `process.env` in features.

## Enforcement

- The repo's `biome.jsonc` boundaries reject store and client imports in features and shared code.
- The rest is review only. Cover identity changes, late results and sign-out with tests: see [mobile testing](mobile-testing.md).
