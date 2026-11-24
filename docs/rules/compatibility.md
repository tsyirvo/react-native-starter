# Compatibility with installed builds

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists.

A store build stays on users' phones for months. It keeps reading its local storage and calling the backend after each new deploy. So each value that an installed build reads or sends is a **deployed contract**.

## Deployed contracts

- Persisted storage: MMKV ids, storage keys, Legend State `persist` names, and the shape of each stored value.
- Backend contracts: function paths, arguments and return shapes; tables, columns and enum values that a build reads or writes; HTTP routes, their params and their responses.
- Deep links and route paths that a link, a notification or a widget opens.
- Analytics event names and property names, and feature flag names.

The repo's `AGENTS.md` or its backend rule names where each of these lives.

## Rules

- Keep each deployed contract as it is. A typecheck that passes does not prove that an older build still works.
- Make additive changes: a new function, a new optional argument, a new optional field, a new key.
- When a contract must change, keep the old one beside the new one until no supported build calls it. Keep its old behavior, even where the new one corrects it.
- Add a new enum value to the backend before you release a build that sends it.
- A removal or rename that an installed build still uses is a breaking change. It waits for a forced update, planned in `docs/plans/` with its rollback.
- Code that stays only for older builds carries a marker and an entry in `docs/deprecations.md`, in the same change. The marker is `@deprecated compat(app<X.Y.Z): <reason>`, with the first app version that no longer needs the code. Remove the code, the marker and the entry together.
- Persisted data that changes shape gets a migration that reads the old shape, and a test with a value written by the previous version.

## Enforcement

- A test that pins the persisted names and, with a backend, the backend contract. The repo's `AGENTS.md` names it.
- The rest is review only. The pull request body lists each contract it changes.
