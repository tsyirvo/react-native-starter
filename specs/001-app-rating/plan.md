# Implementation Plan: App Store Rating Request

**Branch**: `001-app-rating` | **Date**: 2025-11-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-app-rating/spec.md`

## Summary

Implement an in-app rating prompt feature that guides users through a satisfaction check before requesting an app store rating. Users who respond positively are shown the native store rating modal, while those with negative feedback are directed to an internal feedback form. The feature integrates with the existing `useAppStoreReview` hook for native rating functionality and creates a new `RatingSlice` in Zustand for state management, with comprehensive analytics tracking throughout the user journey.

## Technical Context

**Language/Version**: TypeScript 5.9+ with React Native 0.81.4
**Primary Dependencies**:
  - Expo SDK ~54.0.0 with expo-store-review ~9.0.8
  - React Native Unistyles 3.0.15 for styling
  - Zustand 5.0.8 with Immer for state management
  - i18next 25.6.0 for internationalization
  - PostHog (via existing Analytics infrastructure) for event tracking
  - Expo Router ~6.0.12 for navigation

**Storage**: Zustand store with MMKV persistence (local storage only, no backend integration in initial implementation)

**Testing**:
  - Jest 29.7.0 with React Native Testing Library for component tests
  - Maestro for E2E testing of the complete rating flow

**Target Platform**: iOS 15+ and Android (React Native cross-platform)

**Project Type**: Mobile (React Native with Expo)

**Performance Goals**:
  - Rating prompt screen renders in <500ms
  - Native modal appears within 100ms of user tapping "Yes"
  - Feedback submission completes in <1 second with local storage
  - Smooth 60fps animations throughout the flow

**Constraints**:
  - Must use Unistyles (no inline styles)
  - All user-facing strings through i18next
  - Clean architecture: UI in features layer, state in infra/store
  - Arrow functions only, Props interfaces before components
  - Path aliases ($shared, $features, etc.)

**Scale/Scope**: Single feature with 2 screens (rating prompt + feedback form), 1 store slice, analytics integration, entry point from Features tab screen

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Principle I: Clean Architecture First
- **Status**: COMPLIANT
- **Implementation**:
  - Feature UI components in `src/features/appRating/`
  - Store slice in `src/infra/store/slices/rating/`
  - Reuses existing infrastructure: `useAppStoreReview` hook, Analytics, Zustand store
  - Clear separation: Features layer for UI, Infrastructure layer for state/persistence

### ✅ Principle II: TypeScript Strict Mode
- **Status**: COMPLIANT
- **Implementation**:
  - All components, hooks, and store slice fully typed
  - Props interfaces defined before components
  - Store state and actions typed via Zustand StateCreator pattern
  - No `any` types

### ✅ Principle III: Test Coverage for New Features
- **Status**: COMPLIANT
- **Implementation**:
  - Unit tests for RatingSlice (state transitions, persistence)
  - Component tests for RatingPromptScreen (Yes/No interactions)
  - Component tests for FeedbackForm (input validation, submission)
  - E2E test with Maestro for complete user flow
  - Tests cover edge cases (unavailable modal, empty feedback, cancellation)

### ✅ Principle IV: Unistyles for All Styling
- **Status**: COMPLIANT
- **Implementation**:
  - All component styles via StyleSheet.create() from Unistyles
  - Use theme tokens (spacing, colors, typography)
  - No inline styles

### ✅ Principle V: Internationalization Ready
- **Status**: COMPLIANT
- **Implementation**:
  - All strings via i18next translation keys
  - New keys added to `src/infra/i18n/resources/en/translation.json`
  - Keys: `ratingPrompt.question`, `ratingPrompt.yes`, `ratingPrompt.no`, `feedbackForm.title`, `feedbackForm.placeholder`, `feedbackForm.submit`, `feedbackForm.confirmation`

### ✅ Principle VI: Expo Development Builds & Environment Management
- **Status**: COMPLIANT
- **Implementation**:
  - Uses existing expo-store-review integration (already configured)
  - No new environment variables required
  - Works in development build (native modal requires development build, not Expo Go)

### ✅ Principle VII: Git Flow with Quality Gates
- **Status**: COMPLIANT
- **Implementation**:
  - Feature branch: `001-app-rating` (already created)
  - Pre-commit hooks will run on all changes
  - Conventional commits for all work
  - PR to `develop` with quality workflow checks

**Overall Assessment**: ✅ All constitution principles compliant. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-app-rating/
├── plan.md              # This file (/speckit.plan command output)
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (N/A - no API contracts needed)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # Spec quality checklist (completed)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── (protected)/
│       └── (tabs)/
│           ├── features/
│           │   ├── index.tsx                    # Add CTA button (MODIFY)
│           │   └── (appRating)/                 # New rating flow routes
│           │       ├── _layout.tsx              # Stack navigation for rating screens
│           │       ├── prompt.tsx               # Rating prompt screen
│           │       └── feedback.tsx             # Feedback form screen
│
├── features/
│   └── appRating/                               # NEW FEATURE
│       ├── components/
│       │   ├── RatingPrompt/
│       │   │   ├── RatingPrompt.tsx             # Main prompt UI
│       │   │   ├── RatingPrompt.styles.ts       # Unistyles styles
│       │   │   └── RatingPrompt.test.tsx        # Component tests
│       │   └── FeedbackForm/
│       │       ├── FeedbackForm.tsx             # Feedback form UI
│       │       ├── FeedbackForm.styles.ts       # Unistyles styles
│       │       └── FeedbackForm.test.tsx        # Component tests
│       ├── hooks/
│       │   └── useRatingFlow.ts                 # Business logic hook
│       └── index.ts                             # Public exports
│
├── infra/
│   ├── store/
│   │   ├── slices/
│   │   │   ├── rating/                          # NEW SLICE
│   │   │   │   ├── rating.slice.ts              # Zustand slice
│   │   │   │   ├── rating.types.ts              # TypeScript types
│   │   │   │   ├── rating.slice.test.ts         # Slice tests
│   │   │   │   └── index.ts                     # Exports
│   │   │   └── [existing app/, session/]
│   │   └── store.ts                             # Add rating slice (MODIFY)
│   │
│   ├── analytics/
│   │   └── analytics.types.ts                   # Add rating events (MODIFY)
│   │
│   └── i18n/
│       └── resources/
│           └── en/
│               └── translation.json              # Add rating strings (MODIFY)
│
└── features/
    └── storeRating/
        └── hooks/
            └── useAppStoreReview.ts              # REUSE existing hook

tests/
└── e2e/
    └── appRating.yaml                           # NEW Maestro E2E test
```

**Structure Decision**: Single project structure (mobile app) with feature-based organization. The app uses Expo Router's file-based routing with grouped routes for the rating flow. Feature components live in `src/features/appRating/`, state management in `src/infra/store/slices/rating/`, and routing in `src/app/(protected)/(tabs)/features/(appRating)/`. This follows the existing pattern used for blog posts and other features.

## Complexity Tracking

> **No violations** - Constitution Check passed all principles. No justification needed.
