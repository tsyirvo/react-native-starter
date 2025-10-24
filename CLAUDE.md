# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Useful Commands

### Testing

- `yarn test` - Run unit tests without coverage
- `yarn test:coverage` - Run unit tests with coverage
- `yarn test:e2e` - Run Maestro E2E tests (requires Maestro installation)

### Quality & Linting

- `yarn lint:ts` - Run TypeScript type checking
- `yarn lint` - Run ESLint with auto-fix
- `yarn prettify` - Format code with Prettier
- `yarn pretty:check` - Check Prettier formatting

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
- **TypeScript** with custom ESLint config
- **Unistyles** for theming and styling
- **GraphQL** with CodeGen and TanStack Query
- **Zustand** for state management
- **i18next** for internationalization
- **Sentry** for error monitoring
- **PostHog** for analytics and feature flags

### Theming System

- Uses Unistyles for consistent theming
- Theme file in `src/domain/theme/`

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
- Pre-commit hooks run related tests

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
3. Pre-commit hooks ensure code quality
4. Conventional commits for automated changelogs
5. Git Flow with develop/master branches

## Coding Conventions

### General Rules

- Always use TypeScript
- Always use yarn
- Use ES modules, use `import`, don't use `require`
- Prefer async/await where possible and always handle error cases
- Always wrap arrow function args in parentheses
- Never define inline styles and always use Unistyles's StyleSheet API
- When there are ESLint warning, always try to fix them, and ask for feedback if you can't
- For components, hooks or utils used outside of the current folder, create an index.ts file that does the exporting by using the `export * from X` syntax.

### React Component Structure

- Use arrow functions with extracted Props type
- Don't use `React.FC` type
- Prefer types to interfaces for props
- To extract Props type, use `ComponentProps<typeof MyComponent>`
- No need to forwardRef, as the project uses React 19

### Code Quality

- ESLint configuration is defined at the root of the project
- TypeScript strict mode enabled
- React strict mode is also enabled
- Always run `yarn lint`, `yarn lint:ts` and `yarn prettify` then fix potential errors before finishing a task
