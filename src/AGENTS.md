# Source-code conventions

Read the root [AGENTS.md](../AGENTS.md) and its task-specific guides. These rules
apply throughout `src/`, including routes; keep this file outside `src/app/`.

- Use TypeScript and ES module imports. Preserve strict typing; do not add `any`, unsafe casts or blanket lint/type suppressions to make checks pass.
- Match nearby naming and role-based folders; create only folders needed by the module.
- Use `$...` imports for cross-module public APIs and relative imports for local implementation.
- Export reusable components, hooks and utilities through local `index.ts` files. Keep module-root exports intentional; do not import your own root barrel internally. Context definitions and initialization-sensitive dependencies may use direct imports.
- Use arrow-function components with extracted Props interfaces, not `React.FC`. Use `ComponentProps<typeof Component>` when deriving another component's props.
- React 19 supports refs as props; follow the existing pattern rather than adding `forwardRef`.
- Reuse `shared/uiKit` primitives and theme tokens. Define styles with Unistyles's `StyleSheet`, not inline style objects or a second styling library.
- Put user-facing text in `infra/i18n/resources/`; add matching keys in every locale.
- Use TanStack Query for server state and the existing Zustand store for shared client state. Keep transient state local where possible; inspect current state owners before extending them and do not duplicate their responsibilities.
- Handle rejected promises and clean up listeners/effects. Guard asynchronous results against unmounts or obsolete identities.
- Colocate tests and stories with their owner. Import native test helpers from `$testing`.
- Do not edit generated icon components by hand; change their SVG source and use `bun run generate:icons` when needed.
