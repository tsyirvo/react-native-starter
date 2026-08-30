# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Useful Commands

### Testing

- `bun run test` - Run unit tests without coverage (never `bun test`, which would run Bun's own runner)
- `bun run test:coverage` - Run unit tests with coverage
- `bun run test:e2e` - Run Maestro E2E tests (requires Maestro installation)

### Quality & Linting

- `bun run lint:ts` - Run TypeScript type checking
- `bun run lint` - Run Biome with auto-fix (lint + format + import sorting)
- `bun run lint:ci` - Read-only Biome check for CI (`biome ci`)
- `bun run format` / `bun run format:check` - Format / check formatting with Biome

### Git hooks

- Managed by [hk](https://hk.jdx.dev/), configured in `hk.pkl` (`mise install` wires them up via `hk install --mise`)
- `bun run hooks:check` - Run the pre-push checks over the whole repo (read-only)
- `bun run hooks:fix` - Run the pre-commit fixers over the whole repo
- `mise run hooks:pre-commit` / `mise run hooks:pre-push` - Dry-run a hook

## Architecture Overview

### Project Structure

- **src/app/** - Expo Router app directory with file-based routing
- **src/application/** - Application layer with business logic and queries
- **src/domain/** - Domain layer with entities, contexts, and theme
- **src/features/** - Feature-specific components and logic
- **src/infra/** - Infrastructure layer (API, storage, analytics, etc.)
- **src/shared/** - Shared components, hooks, and utilities

### Key Technologies

- **React Native** with **Expo** and Development Builds
- **Expo Router** for file-based routing
- **TypeScript** with Biome (Ultracite presets) linting/formatting
- **Unistyles** for theming and styling
- **GraphQL** with CodeGen and TanStack Query
- **Zustand** for state management
- **i18next** for internationalization
- **Sentry** for error monitoring
- **PostHog** for analytics and feature flags

### Theming System

- Uses Unistyles for consistent theming
- Theme file in `src/domain/theme/unistyles.ts`

### State Management

- **Zustand** store in `src/infra/store/`
- Slice-based architecture (`app`, `session`)
- Persistence with selective field exclusion
- Immer integration for immutable updates

### API Layer

- GraphQL client with TanStack Query
- Code generation from schema
- Token-based authentication
- Query client persistence
- Request failure queue for offline support

### Testing Strategy

- Jest with React Native Testing Library
- Maestro for E2E testing
- Coverage reporting with exclusions for generated code
- `pre-commit` runs the tests related to the staged files, `pre-push` runs the full suite

### Path Mapping

- `$*` maps to `src/*` for clean imports
- Platform-specific file extensions (`.ios.tsx`, `.android.tsx`)

## Development Notes

### Internationalization

- English is the default locale
- Translation files in `src/infra/i18n/resources/`
- All locales must have same keys as English (linted)
- Supports RTL languages

### Feature Flags

- PostHog-based feature flags
- Components for A/B testing (`FeatureFlagSplitter`)
- Hooks for flag access (`useGetBooleanFeatureFlag`, `useGetFeatureFlag`)

### Error Handling

- Sentry integration for crash reporting
- Global error boundary (`FullscreenErrorBoundary`)
- Breadcrumb tracking for debugging

### Analytics & Tracking

- PostHog for product analytics
- Screen tracking and app state monitoring
- Purchase tracking via RevenueCat

### Development Workflow

1. Use development builds for native dependency testing
2. Storybook for component development
3. Git hooks (hk) ensure code quality: `pre-commit` fixes and checks the staged files, `pre-push` runs Biome, TypeScript and the full test suite over the repo
4. Conventional commits for automated changelogs, enforced by the `commit-msg` hook
5. Git Flow with develop/master branches

## Coding Conventions

### General Rules

- Always use TypeScript
- Always use bun (`bun install`, `bun run <script>`, `bunx <binary>`)
- Use ES modules, use `import`, don't use `require`
- Prefer async/await where possible and always handle error cases
- Always wrap arrow function args in parentheses
- Never define inline styles and always use Unistyles's StyleSheet API
- When there are lint warnings, always try to fix them, and ask for feedback if you can't
- For components, hooks or utils used outside of the current folder, create an index.ts file that does the exporting by using the `export * from X` syntax.

### React Component Structure

- Use arrow functions with extracted Props interfaces
- Don't use `React.FC` type
- Prefer interfaces to types for Props
- To extract Props type, use `ComponentProps<typeof MyComponent>`
- No need to forwardRef, as the project uses React 19

### Code Quality

- Linting/formatting rules come from the [`ultracite`](https://github.com/haydenbleasel/ultracite) presets in `biome.jsonc` (`ultracite/biome/core` + `ultracite/biome/react`); deviations from the defaults are documented with comments in that file
- TypeScript strict mode enabled
- React strict mode is also enabled
- Always run `bun run lint`, `bun run lint:ts` and `bun run format` then fix potential errors before finishing a task
