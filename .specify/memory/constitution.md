<!--
Sync Impact Report:
Version change: N/A (initial creation) → 1.0.0
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (7 principles)
  - Architecture & Code Organization
  - Development Workflow
  - Governance
Templates requiring updates:
  ✅ plan-template.md - aligned with Mobile + API structure and test requirements
  ✅ spec-template.md - aligned with user scenario requirements
  ✅ tasks-template.md - aligned with test-first principle and user story organization
Follow-up TODOs: None
-->

# React Native Starter Constitution

## Core Principles

### I. Clean Architecture First

The project MUST adhere to clean/hexagonal architecture principles with clear separation of concerns across layers:

- **Application Layer** (`src/application/`): Business logic, queries, and use cases - no UI dependencies
- **Domain Layer** (`src/domain/`): Core entities, contexts, theme definitions - framework-agnostic
- **Infrastructure Layer** (`src/infra/`): External concerns (API, storage, analytics, i18n) - replaceable implementations
- **Features** (`src/features/`): Feature-specific components combining application logic with UI
- **Shared** (`src/shared/`): Reusable components, hooks, and utilities with no feature-specific logic

**Rationale**: This separation ensures maintainability, testability, and allows starter consumers to easily understand where to place new code. Each layer can evolve independently.

### II. TypeScript Strict Mode (NON-NEGOTIABLE)

All code MUST be written in TypeScript with strict mode enabled. No `any` types except in explicit, documented edge cases (e.g., third-party library integrations without types).

- Type definitions for all functions, components, and utilities
- Interfaces/types exported from dedicated files when shared across modules
- ESLint TypeScript rules strictly enforced
- `yarn lint:ts` MUST pass before any commit

**Rationale**: Type safety prevents runtime errors, improves developer experience with IDE autocompletion, and serves as living documentation for starter consumers. This is non-negotiable because the starter's value proposition includes robust tooling.

### III. Test Coverage for New Features

New features and critical utilities MUST include tests. The project supports:

- **Unit tests**: Jest with React Native Testing Library for components and utilities
- **E2E tests**: Maestro for critical user flows
- Tests run automatically in pre-commit hooks (related tests only)
- Coverage reports exclude generated code and stories

**Testing is NOT mandatory for**:
- Simple presentational components with no logic
- Storybook stories
- Configuration files
- Type definitions

**Rationale**: As a starter project, code quality sets expectations for consumer projects. Tests demonstrate best practices and prevent regressions when updating dependencies.

### IV. Unistyles for All Styling

ALL component styling MUST use Unistyles' StyleSheet API. Inline styles are prohibited.

- Theme definitions in `src/domain/theme/unistyles.ts`
- Consistent spacing, colors, and typography from theme
- Support for light/dark modes and RTL languages built into theme
- No style duplication across components

**Rationale**: Unistyles provides type-safe, performant styling with theming support. Inline styles bypass the theme system and create maintenance debt.

### V. Internationalization Ready

All user-facing strings MUST use i18next translations, never hardcoded strings.

- Translation files in `src/infra/i18n/resources/`
- English as default locale (fully populated)
- ESLint rules ensure all locales have same keys as English
- Support for RTL languages and pluralization built-in

**Rationale**: Even if initial apps are English-only, this pattern prevents technical debt when internationalization becomes required. It's easier to maintain from day one.

### VI. Expo Development Builds & Environment Management

The starter uses Expo with custom development builds (NOT Expo Go) to support native dependencies.

- Three environments: Development, Staging, Production
- Environment variables managed via `.env.[environment]` files
- Doppler CLI integration for secret management
- EAS for production builds with secret injection
- All SDKs (Sentry, PostHog, OneSignal, RevenueCat) require configuration per environment

**Rationale**: Custom development builds enable native libraries essential for production apps. Multiple environments allow realistic testing before production deployment.

### VII. Git Flow with Quality Gates

Development follows Git Flow with automated quality enforcement:

- Main branches: `develop` (integration) and `master` (production)
- Feature branches: `###-feature-name` format
- **Quality workflow** runs on all PRs to `develop`: tests, linting, TypeScript checks
- Conventional commits enforced via commitlint for automated changelogs
- Pre-commit hooks run linting and related tests on staged files
- No direct commits to `develop` or `master`

**Rationale**: Automated quality gates prevent broken code from reaching integration branches. Conventional commits enable semantic versioning and changelog generation.

## Architecture & Code Organization

### Component Structure

React components MUST follow this structure:

```typescript
// ✅ Correct
interface MyComponentProps {
  title: string;
  onPress: () => void; // Methods last
}

export const MyComponent = ({ title, onPress }: MyComponentProps) => {
  // Component logic
};

// ❌ Incorrect - no React.FC, methods not last, named function
export const MyComponent: React.FC<Props> = function(props) { ... }
```

**Rules**:
- Arrow functions only (no named functions)
- Props interfaces (not types) extracted before component
- Methods/callbacks as last props
- No `React.FC` type annotation (React 19)
- No `forwardRef` needed (React 19 handles refs automatically)

### Path Mapping

Use path aliases for clean imports:
- `$*` maps to `src/*` (e.g., `import { Button } from '$shared/components'`)
- Platform-specific extensions: `.ios.tsx`, `.android.tsx`

### Module Exports

For components, hooks, or utilities used outside their folder:
- Create `index.ts` in the folder
- Use `export * from './ComponentName'` syntax
- No default exports for components (named exports only)

### GraphQL Integration

- GraphQL queries/mutations in separate `.graphql` files
- CodeGen generates TypeScript types from schema
- TanStack Query hooks for data fetching with persistence
- Request failure queue for offline support

## Development Workflow

### Before Starting Work

1. Pull latest `develop` branch
2. Create feature branch: `git checkout -b ###-feature-name`
3. Ensure environment variables configured (app won't launch otherwise)

### During Development

1. Run `yarn start:dev` for Metro bundler (injects dev secrets via Doppler)
2. Use Storybook for component development: `yarn start:storybook`
3. Write tests for new features/utilities
4. Pre-commit hooks automatically run on staged files

### Before Committing

Run these commands and fix any errors:
```bash
yarn lint:ts    # TypeScript type checking
yarn lint       # ESLint with auto-fix
yarn prettify   # Prettier formatting
yarn test       # Jest unit tests
```

### Pull Request Requirements

- All quality checks passing (enforced by GitHub Actions)
- Conventional commit format for PR title
- No ESLint or TypeScript errors
- Tests included for new features (if applicable)
- Updated documentation if API/architecture changes

### Adding Dependencies

When adding new npm packages:
- Prefer libraries with TypeScript support
- Check React Native compatibility
- Update `package.json` with exact versions
- Test in development build, not just web preview
- Document required environment variables if any

## Governance

### Constitution Authority

This constitution supersedes all other project practices. When conflicts arise between this document and code patterns, this document prevails.

### Amendment Process

1. Propose changes via PR updating this file
2. Increment `CONSTITUTION_VERSION` following semantic versioning:
   - **MAJOR**: Backward-incompatible changes (e.g., removing principles, major architecture shifts)
   - **MINOR**: New principles added or existing ones materially expanded
   - **PATCH**: Clarifications, wording improvements, non-semantic refinements
3. Update `LAST_AMENDED_DATE` to amendment date
4. Include migration plan in PR description if changes require code updates
5. Sync dependent templates (plan, spec, tasks) with new principles
6. Update `CLAUDE.md` if agent-specific guidance changes

### Compliance Verification

**All pull requests MUST**:
- Pass automated quality gates (tests, linting, TypeScript)
- Adhere to architectural layering (no cross-layer violations)
- Use Unistyles for styling (no inline styles)
- Include i18next for any user-facing strings
- Follow conventional commit format

**Code reviews MUST verify**:
- Clean architecture principles respected
- TypeScript strict mode compliance
- Test coverage for new features (where applicable)
- No hardcoded strings or inline styles
- Proper path aliases used

### Complexity Justification

Any deviation from KISS/DRY/SOLID principles MUST be justified in PR description or code comments. Examples requiring justification:
- Adding new architectural layers beyond the four defined
- Introducing new state management beyond Zustand
- Adding styling systems beyond Unistyles
- Bypassing TypeScript strict mode

### Starter-Specific Considerations

As a **starter project**, this codebase serves two audiences:

1. **Contributors**: Developers improving the starter itself
2. **Consumers**: Developers using this starter to bootstrap new apps

Therefore:
- **Documentation is paramount**: Every pattern should be self-explanatory
- **Dependencies are curated**: Only battle-tested libraries with strong ecosystems
- **Configuration over code**: Prefer configurable solutions consumers can adjust
- **Examples over abstractions**: Show concrete usage patterns, avoid premature optimization

**Version**: 1.0.0 | **Ratified**: 2025-11-08 | **Last Amended**: 2025-11-08
