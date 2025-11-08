# Research: App Store Rating Request

**Feature**: App Store Rating Request
**Date**: 2025-11-08
**Phase**: 0 - Research & Technical Investigation

## Overview

This document captures research findings and technical decisions for implementing the in-app rating prompt feature in the React Native starter project.

## Research Areas

### 1. Native Store Rating Integration

**Question**: How to integrate with platform-specific app store rating modals?

**Decision**: Use existing `useAppStoreReview` hook with expo-store-review

**Rationale**:
- The project already has `src/features/storeRating/hooks/useAppStoreReview.ts` implemented
- Hook wraps expo-store-review with availability checking
- Provides `isStoreReviewAvailable()` to check device support
- Provides `requestStoreReview()` to trigger native modal
- expo-store-review handles iOS App Store and Google Play Store differences automatically
- No additional dependencies needed

**Implementation Pattern**:
```typescript
const { isStoreReviewAvailable, requestStoreReview } = useAppStoreReview();

// Check availability before showing prompt
const canShowReview = await isStoreReviewAvailable();
if (canShowReview) {
  await requestStoreReview();
}
```

**Alternatives Considered**:
- Direct use of expo-store-review: Rejected because existing hook provides better abstraction
- react-native-rate library: Rejected because project already uses expo-store-review
- Custom native modules: Rejected due to unnecessary complexity

---

### 2. State Management Architecture

**Question**: How to persist rating prompt state (shown, user response, timestamps)?

**Decision**: Create new Zustand slice called `RatingSlice` with MMKV persistence

**Rationale**:
- Project uses Zustand for global state management (see `src/infra/store/store.ts`)
- Existing slice pattern in `src/infra/store/slices/app/` and `src/infra/store/slices/session/`
- MMKV persistence already configured for store
- Slice pattern provides type-safe state access across components
- Immer integration for immutable updates

**State Shape**:
```typescript
interface RatingState {
  hasBeenPrompted: boolean;
  lastPromptedAt: string | null;
  userResponse: 'yes' | 'no' | 'dismissed' | null;
  feedbackSubmissions: FeedbackEntry[];
}

interface FeedbackEntry {
  id: string;
  text: string;
  submittedAt: string;
  appVersion: string;
  deviceInfo: string;
}
```

**Alternatives Considered**:
- AsyncStorage: Rejected because project uses MMKV for better performance
- Local state only: Rejected because state needs to persist across app sessions
- Existing app slice: Rejected to maintain separation of concerns

---

### 3. Analytics Event Tracking

**Question**: What events should be tracked for the rating flow?

**Decision**: Extend existing Analytics infrastructure with rating-specific events

**Rationale**:
- Project has established analytics pattern via `src/infra/analytics/analytics.ts`
- Uses PostHog via `productTrackingClient`
- Event types defined in `src/infra/analytics/analytics.types.ts`
- Consistent with existing analytics approach

**Events to Track**:
```typescript
// Add to AnalyticsType.EventNames
| 'rating-prompt-viewed'           // User sees initial "Do you like this app?" screen
| 'rating-prompt-response-yes'     // User taps "Yes"
| 'rating-prompt-response-no'      // User taps "No"
| 'rating-prompt-dismissed'        // User exits without responding
| 'rating-modal-shown'             // Native rating modal successfully displayed
| 'rating-modal-unavailable'       // Native modal couldn't be shown
| 'feedback-form-viewed'           // User sees feedback form
| 'feedback-form-submitted'        // User submits feedback (with/without text)
| 'feedback-form-cancelled'        // User cancels feedback form
```

**Implementation Pattern**:
```typescript
import { Analytics } from '$infra/analytics';

Analytics.trackEvent('rating-prompt-viewed');
Analytics.trackEvent('rating-prompt-response-yes', {
  promptedAt: timestamp
});
Analytics.trackEvent('feedback-form-submitted', {
  hasText: text.length > 0,
  textLength: text.length
});
```

**Alternatives Considered**:
- Separate analytics service: Rejected to maintain consistency with existing approach
- Minimal tracking: Rejected because product team needs comprehensive funnel data

---

### 4. Navigation Pattern

**Question**: How should users navigate to and from the rating screens?

**Decision**: Use Expo Router grouped routes with modal-style presentation

**Rationale**:
- Project uses Expo Router file-based navigation
- Existing pattern for feature sub-routes: `(protected)/(tabs)/features/(blogPost)/[blogPostId].tsx`
- Grouped routes `(appRating)` keep rating flow isolated
- Modal presentation provides better UX for transient flows

**Route Structure**:
```
src/app/(protected)/(tabs)/features/
├── index.tsx                          # Features screen (add CTA button)
└── (appRating)/
    ├── _layout.tsx                    # Stack navigator with modal presentation
    ├── prompt.tsx                     # Rating prompt screen
    └── feedback.tsx                   # Feedback form screen
```

**Navigation Flow**:
1. Features screen → `router.push('/features/(appRating)/prompt')`
2. Prompt screen (Yes) → Trigger native modal → `router.back()`
3. Prompt screen (No) → `router.push('/features/(appRating)/feedback')`
4. Feedback screen (Submit/Cancel) → `router.back()` (returns to Features screen)

**Alternatives Considered**:
- Separate tab: Rejected because rating is a transient action, not a destination
- Modal overlay: Rejected because Expo Router's grouped routes provide cleaner architecture
- Bottom sheet: Rejected to maintain consistency with existing navigation patterns

---

### 5. Form Input Handling

**Question**: How should the feedback text input be implemented?

**Decision**: Use TextInput with keyboard-aware layout and character limit

**Rationale**:
- Standard React Native TextInput with multiline support
- Project uses react-native-keyboard-controller for keyboard handling
- TextInput integrates well with Unistyles theming
- Character limit (e.g., 500 chars) prevents abuse and improves UX

**Implementation Pattern**:
```typescript
<TextInput
  multiline
  numberOfLines={4}
  maxLength={500}
  placeholder={t('feedbackForm.placeholder')}
  value={feedbackText}
  onChangeText={setFeedbackText}
  style={styles.textInput}
/>
```

**Best Practices**:
- Auto-focus on mount for better UX
- Show character count: "250/500"
- Allow empty submission (user can opt out)
- Clear text on successful submission

**Alternatives Considered**:
- react-hook-form: Rejected because simple form doesn't need validation library
- Third-party rich text editor: Rejected due to complexity and bundle size
- Fixed height vs auto-grow: Chose fixed height for predictable layout

---

### 6. Internationalization Strategy

**Question**: How to handle translations for rating flow?

**Decision**: Add keys to existing i18next structure under `ratingPrompt` and `feedbackForm` namespaces

**Rationale**:
- Project uses i18next with translations in `src/infra/i18n/resources/en/translation.json`
- ESLint rules enforce all locales have same keys as English
- Consistent with existing feature translations

**Translation Keys**:
```json
{
  "ratingPrompt": {
    "question": "Do you like this app?",
    "yes": "Yes, I love it!",
    "no": "Not really",
    "title": "Rate Our App"
  },
  "feedbackForm": {
    "title": "Help us improve",
    "placeholder": "Tell us what we can do better...",
    "submit": "Submit Feedback",
    "cancel": "Cancel",
    "confirmation": "Thank you for your feedback!",
    "characterCount": "{{current}}/{{max}} characters"
  }
}
```

**Alternatives Considered**:
- Hardcoded strings: Rejected due to constitution requirement
- Separate i18n namespace: Rejected to maintain flat structure

---

### 7. Error Handling & Edge Cases

**Question**: How to handle failure scenarios gracefully?

**Decision**: Implement defensive checks with fallback behaviors

**Edge Case Handling**:

1. **Native modal unavailable**:
   - Check `isStoreReviewAvailable()` before showing prompt
   - If unavailable: Track event, show toast, navigate back
   - Don't show prompt again if device doesn't support it

2. **User already rated**:
   - iOS/Android APIs handle this (won't show modal twice)
   - Track event to understand frequency
   - Consider adding cooldown period in state

3. **Network failures** (future backend integration):
   - Store feedback locally in Zustand
   - Retry mechanism when network restored
   - Show success confirmation even if sync pending

4. **Empty feedback submission**:
   - Allow submission without text (user choice)
   - Track separately: `hasText: false`
   - Show same confirmation message

5. **Very long feedback text**:
   - Enforce maxLength prop on TextInput (500 chars)
   - Show character counter
   - Truncate if somehow exceeds limit

**Implementation Pattern**:
```typescript
const handleYesPress = async () => {
  Analytics.trackEvent('rating-prompt-response-yes');

  const isAvailable = await isStoreReviewAvailable();

  if (!isAvailable) {
    Analytics.trackEvent('rating-modal-unavailable');
    // Show toast notification
    router.back();
    return;
  }

  Analytics.trackEvent('rating-modal-shown');
  await requestStoreReview();
  router.back();
};
```

---

## Technology Stack Summary

| Component | Technology | Justification |
|-----------|-----------|---------------|
| UI Framework | React Native 0.81.4 | Project standard |
| Navigation | Expo Router ~6.0.12 | Project standard, file-based routing |
| Styling | Unistyles 3.0.15 | Constitution requirement, type-safe theming |
| State Management | Zustand 5.0.8 + Immer | Project standard, slice-based architecture |
| Persistence | MMKV (via Zustand) | Project standard, performant local storage |
| Native Rating API | expo-store-review ~9.0.8 | Already integrated, cross-platform support |
| Internationalization | i18next 25.6.0 | Project standard, constitution requirement |
| Analytics | PostHog (via Analytics class) | Project standard, existing infrastructure |
| Testing | Jest + RNTL + Maestro | Project standard, unit + E2E coverage |
| Type Safety | TypeScript 5.9+ | Constitution requirement, strict mode |

## Implementation Priorities

### Phase 1: Core MVP (User Story 1 - Positive Flow)
1. RatingSlice with state management
2. Rating prompt screen with Yes/No buttons
3. Integration with useAppStoreReview hook
4. Analytics tracking for core events
5. Navigation setup and CTA on Features screen

### Phase 2: Feedback Flow (User Story 2 - Negative Flow)
1. Feedback form screen
2. Text input with keyboard handling
3. Feedback submission to store
4. Confirmation messaging
5. Additional analytics events

### Phase 3: Polish (User Story 3 - Edge Cases)
1. Empty submission handling
2. Cancel/back button behavior
3. Error handling for unavailable modal
4. Character counter and limits
5. E2E test coverage

## Open Questions

1. **Timing/Frequency Logic**: When should the prompt be shown to users?
   - *Resolution*: Deferred to implementation phase; will add configurable logic to RatingSlice (e.g., after X sessions, not within Y days of last prompt)

2. **Backend Integration**: When/how to sync feedback to server?
   - *Resolution*: Out of scope for initial implementation; local storage only; documented in assumptions

3. **Localization**: Which languages beyond English?
   - *Resolution*: English only in initial implementation; French translation will be added by maintainers following existing process

## References

- [expo-store-review Documentation](https://docs.expo.dev/versions/latest/sdk/storereview/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Expo Router Grouped Routes](https://docs.expo.dev/router/advanced/groups/)
- Project constitution: `.specify/memory/constitution.md`
- Existing store review hook: `src/features/storeRating/hooks/useAppStoreReview.ts`
