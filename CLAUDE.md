# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `yarn start:dev` - Start development server with Doppler secrets injection
- `yarn start:staging` - Start staging environment
- `yarn start:production` - Start production environment
- `yarn start:storybook` - Start Storybook for component development

### Building
- `yarn build:dev:ios` - Build development iOS app locally
- `yarn build:dev:android` - Build development Android app locally
- `yarn build:staging:ios` - Build staging iOS app locally
- `yarn build:staging:android` - Build staging Android app locally
- `yarn build:production:ios` - Build production iOS app locally
- `yarn build:production:android` - Build production Android app locally

### Testing
- `yarn test` - Run unit tests without coverage
- `yarn test:coverage` - Run unit tests with coverage
- `yarn test:e2e` - Run Maestro E2E tests (requires Maestro installation)

### Quality & Linting
- `yarn lint:ts` - Run TypeScript type checking
- `yarn lint` - Run ESLint with auto-fix
- `yarn prettify` - Format code with Prettier
- `yarn pretty:check` - Check Prettier formatting

### Utilities
- `yarn codegen` - Generate GraphQL types from schema
- `yarn image:add [path]` - Add and optimize images (creates @2x, @3x variants)
- `yarn generate:icons` - Convert SVG files to React components
- `yarn storybook:generate` - Generate Storybook stories
- `yarn version:bump` - Bump version using standard-version
- `yarn version:tag` - Create git tag for version

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
- **Shopify Restyle** for theming and styling
- **GraphQL** with CodeGen and TanStack Query
- **Zustand** for state management
- **i18next** for internationalization
- **Sentry** for error monitoring
- **PostHog** for analytics and feature flags

### Environment Configuration
The project uses three environments (development, staging, production) with:
- Environment-specific `.env` files
- Doppler CLI for secrets management
- EAS Build profiles for each environment

### Theming System
- Uses Shopify Restyle for consistent theming
- Theme files in `src/domain/theme/`
- Custom `makeAppStyles` hook for component styling
- Supports dark/light mode via `userInterfaceStyle: 'dark'`

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

### Pre-commit Hooks (Lefthook)
- ESLint on staged files
- TypeScript checking
- Test related files
- Commit message linting with conventional commits

### Build Configuration
- EAS Build with multiple profiles
- Development builds with simulator support
- Staging builds with internal distribution
- Production builds with store distribution
- Auto-increment for production builds

## Development Notes

### Required Environment Setup
- Node.js >=22
- Yarn >=4
- Doppler CLI for secrets management
- Expo CLI and EAS CLI
- Maestro for E2E testing

### Icon Generation
SVG icons in `src/shared/icons/svgs/` are automatically converted to React components using SVGR with custom templates.

### Image Management
Use `yarn image:add` to add images - it automatically compresses and creates resolution variants.

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
- AppsFlyer for attribution
- Screen tracking and app state monitoring
- Purchase tracking via RevenueCat

### Development Workflow
1. Use development builds for native dependency testing
2. Storybook for component development
3. Pre-commit hooks ensure code quality
4. Conventional commits for automated changelogs
5. Git Flow with develop/master branches