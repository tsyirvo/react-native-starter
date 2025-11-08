# Data Model: App Store Rating Request

**Feature**: App Store Rating Request
**Date**: 2025-11-08
**Phase**: 1 - Design & Data Modeling

## Overview

This document defines the data structures, state management, and persistence layer for the app rating feature. All data is stored locally using Zustand with MMKV persistence (no backend integration in initial implementation).

## Entities

### 1. Rating State

**Purpose**: Tracks user interactions with the rating prompt system across app sessions.

**Location**: `src/infra/store/slices/rating/rating.types.ts`

**TypeScript Definition**:
```typescript
export interface RatingState {
  // Whether the user has ever been shown the rating prompt
  hasBeenPrompted: boolean;

  // ISO timestamp of the last time prompt was shown
  lastPromptedAt: string | null;

  // User's response to the most recent prompt
  userResponse: UserResponse | null;

  // Collection of all feedback submissions
  feedbackSubmissions: FeedbackEntry[];

  // Configuration for prompt timing/frequency
  promptConfig: PromptConfig;
}

export type UserResponse = 'yes' | 'no' | 'dismissed';

export interface PromptConfig {
  // Minimum days between showing prompts
  cooldownDays: number;

  // Minimum app sessions before first prompt
  minSessionsBeforePrompt: number;

  // Whether to show prompt again after dismissal
  allowRetryAfterDismissal: boolean;
}

export interface FeedbackEntry {
  // Unique identifier for feedback entry
  id: string;

  // User-entered feedback text (can be empty string)
  text: string;

  // ISO timestamp when feedback was submitted
  submittedAt: string;

  // App version at time of submission (e.g., "2.2.0")
  appVersion: string;

  // Device information for context
  deviceInfo: DeviceInfo;

  // Whether feedback has been synced to backend (future use)
  synced: boolean;
}

export interface DeviceInfo {
  // Platform: "ios" or "android"
  platform: string;

  // OS version (e.g., "17.2", "14")
  osVersion: string;

  // Device model (e.g., "iPhone 15 Pro", "Pixel 7")
  deviceModel: string;
}
```

**Relationships**:
- `RatingState` has many `FeedbackEntry` (one-to-many)
- Each `FeedbackEntry` includes embedded `DeviceInfo`
- No relationships with other slices (self-contained)

**Validation Rules**:
- `lastPromptedAt` must be valid ISO 8601 string or null
- `userResponse` must be one of: 'yes', 'no', 'dismissed', or null
- `feedbackSubmissions` array can be empty but never null
- `id` in FeedbackEntry must be unique across all submissions
- `submittedAt` must be valid ISO 8601 string
- `text` in FeedbackEntry can be empty but never null
- `cooldownDays` must be >= 0
- `minSessionsBeforePrompt` must be >= 0

**State Transitions**:
```
Initial State:
  hasBeenPrompted: false
  lastPromptedAt: null
  userResponse: null
  feedbackSubmissions: []

User Views Prompt:
  hasBeenPrompted: true
  lastPromptedAt: [current ISO timestamp]
  userResponse: null (pending)

User Selects "Yes":
  userResponse: 'yes'
  [triggers native rating modal]

User Selects "No":
  userResponse: 'no'
  [navigates to feedback form]

User Dismisses Without Response:
  userResponse: 'dismissed'

User Submits Feedback:
  feedbackSubmissions: [...existing, new FeedbackEntry]
  [FeedbackEntry added with generated id and metadata]
```

**Default Values**:
```typescript
const initialRatingState: RatingState = {
  hasBeenPrompted: false,
  lastPromptedAt: null,
  userResponse: null,
  feedbackSubmissions: [],
  promptConfig: {
    cooldownDays: 30,
    minSessionsBeforePrompt: 3,
    allowRetryAfterDismissal: true,
  },
};
```

---

### 2. Rating Actions

**Purpose**: Zustand actions for modifying rating state.

**TypeScript Definition**:
```typescript
export interface RatingActions {
  // Record that user was shown the prompt
  recordPromptShown: () => void;

  // Record user's response to the prompt
  recordUserResponse: (response: UserResponse) => void;

  // Submit user feedback
  submitFeedback: (text: string, deviceInfo: DeviceInfo, appVersion: string) => void;

  // Check if prompt should be shown based on state and config
  shouldShowPrompt: (currentSessionCount: number) => boolean;

  // Reset all rating state (for testing or user account deletion)
  resetRatingState: () => void;

  // Update prompt configuration
  updatePromptConfig: (config: Partial<PromptConfig>) => void;
}
```

**Implementation Notes**:
- All actions use Immer for immutable state updates
- `submitFeedback` generates unique ID using `Date.now() + Math.random()`
- `shouldShowPrompt` implements business logic for timing/frequency
- `recordPromptShown` updates both `hasBeenPrompted` and `lastPromptedAt`
- Actions are pure functions with no side effects (analytics tracked separately)

---

### 3. Complete Slice Type

**TypeScript Definition**:
```typescript
export type RatingSlice = RatingState & RatingActions;
```

---

## Zustand Store Integration

### Store Configuration

**File**: `src/infra/store/store.ts`

**Changes**:
```typescript
import { createRatingSlice } from './slices/rating';

export interface StoreState extends
  AppSlice,
  SessionSlice,
  RatingSlice  // ADD THIS
{}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAppSlice(...a),
        ...createSessionSlice(...a),
        ...createRatingSlice(...a),  // ADD THIS
      })),
      {
        name: 'rn-starter-storage',
        storage: createJSONStorage(() => mmkvStorage),
        partialize: (state) => ({
          // ... existing
          // Rating slice (persist everything)
          hasBeenPrompted: state.hasBeenPrompted,
          lastPromptedAt: state.lastPromptedAt,
          userResponse: state.userResponse,
          feedbackSubmissions: state.feedbackSubmissions,
          promptConfig: state.promptConfig,
        }),
      }
    ),
    { name: 'RNStarter' }
  )
);
```

**Persistence Strategy**:
- All `RatingState` fields are persisted to MMKV
- No sensitive data (user feedback is non-PII)
- Actions are not persisted (functions cannot be serialized)
- Store rehydrates on app launch

---

## Data Access Patterns

### Reading State

```typescript
// In components/hooks
import { useStore } from '$infra/store';

const hasBeenPrompted = useStore((state) => state.hasBeenPrompted);
const feedbackCount = useStore((state) => state.feedbackSubmissions.length);
const shouldShow = useStore((state) => state.shouldShowPrompt(sessionCount));
```

### Updating State

```typescript
// In components/hooks
import { useStore } from '$infra/store';

const recordPromptShown = useStore((state) => state.recordPromptShown);
const submitFeedback = useStore((state) => state.submitFeedback);

// Usage
recordPromptShown();
submitFeedback(text, deviceInfo, appVersion);
```

### Selector Optimization

```typescript
// Avoid unnecessary re-renders with precise selectors
const lastPromptDate = useStore(
  (state) => state.lastPromptedAt,
  (a, b) => a === b  // shallow equality check
);

// Derived data with useMemo
const daysSinceLastPrompt = useMemo(() => {
  if (!lastPromptDate) return Infinity;
  return Math.floor(
    (Date.now() - new Date(lastPromptDate).getTime()) / (1000 * 60 * 60 * 24)
  );
}, [lastPromptDate]);
```

---

## Migration Strategy

### Initial Implementation (v1)

No migration needed - new slice starts with default values on first app launch.

### Future Considerations

If data model changes in future versions:

1. **Adding new fields**: Provide default values in initialState
2. **Removing fields**: Filter out during rehydration
3. **Changing field types**: Write migration function in store config
4. **Backend sync**: Add `syncStatus` field to FeedbackEntry

Example migration:
```typescript
// If we later add 'locale' field to FeedbackEntry
const migrate = (persistedState: any, version: number) => {
  if (version === 0) {
    // Migrate v0 to v1
    persistedState.feedbackSubmissions = persistedState.feedbackSubmissions.map(
      (entry: any) => ({
        ...entry,
        locale: 'en',  // default locale for old entries
      })
    );
  }
  return persistedState;
};
```

---

## Analytics Event Payloads

Events tracked with state data:

```typescript
// When prompt is shown
Analytics.trackEvent('rating-prompt-viewed', {
  hasBeenPromptedBefore: state.hasBeenPrompted,
  daysSinceLastPrompt: calculateDays(state.lastPromptedAt),
  sessionCount: currentSessionCount,
});

// When user responds
Analytics.trackEvent('rating-prompt-response-yes', {
  promptedAt: state.lastPromptedAt,
  previousResponse: state.userResponse,
});

// When feedback submitted
Analytics.trackEvent('feedback-form-submitted', {
  hasText: text.length > 0,
  textLength: text.length,
  feedbackCount: state.feedbackSubmissions.length + 1,
  platform: deviceInfo.platform,
});
```

---

## Testing Strategy

### Unit Tests for Slice

**File**: `src/infra/store/slices/rating/rating.slice.test.ts`

**Test Cases**:
1. Initial state has correct default values
2. `recordPromptShown` updates hasBeenPrompted and lastPromptedAt
3. `recordUserResponse` sets userResponse correctly
4. `submitFeedback` adds entry with generated ID and metadata
5. `submitFeedback` with empty text is allowed
6. `shouldShowPrompt` returns false when cooldown not elapsed
7. `shouldShowPrompt` returns false when min sessions not reached
8. `shouldShowPrompt` returns true when conditions met
9. `resetRatingState` clears all data
10. State persists across store recreation (MMKV integration test)

### Component Integration Tests

Test components correctly read and update state:
- RatingPrompt calls `recordPromptShown` on mount
- RatingPrompt calls `recordUserResponse` on button press
- FeedbackForm calls `submitFeedback` with correct params

---

## Data Privacy & Security

- **PII**: Feedback text is user-generated; treat as potentially containing PII
- **Storage**: MMKV is encrypted at rest on device
- **Retention**: No automatic deletion; persists until app uninstall
- **Sync**: No backend sync in v1; when added, require user consent
- **Analytics**: Avoid sending raw feedback text in analytics events
- **Export**: Consider adding GDPR export functionality if backend sync added

---

## Performance Considerations

- **Bundle Size**: ~2KB additional for rating slice and types
- **Memory**: ~1KB per FeedbackEntry (10 entries ≈ 10KB)
- **Rehydration**: Fast (<10ms) due to MMKV performance
- **Selectors**: Use shallow equality to prevent unnecessary re-renders
- **Submission**: Synchronous write to MMKV (<5ms)

---

## Summary

The rating feature uses a single Zustand slice for all state management:

- **Entities**: RatingState (main), FeedbackEntry, PromptConfig
- **Storage**: Zustand + Immer + MMKV (fully persisted)
- **Relationships**: Self-contained, no dependencies on other slices
- **Validation**: TypeScript strict mode + runtime checks in actions
- **Testing**: Comprehensive unit tests for state transitions
- **Privacy**: Local-only storage, no automatic backend sync

No API contracts needed in initial implementation (contracts/ directory not required).
