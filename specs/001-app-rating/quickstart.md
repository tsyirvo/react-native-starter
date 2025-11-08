# Quickstart: App Store Rating Request

**Feature**: App Store Rating Request
**Audience**: Developers implementing this feature
**Date**: 2025-11-08

## Overview

This guide provides step-by-step instructions for implementing the app store rating feature. Follow this guide after reviewing the specification, research, and data model documents.

## Prerequisites

- [ ] Development environment set up per project README
- [ ] Running on development build (not Expo Go)
- [ ] Familiar with Zustand store pattern in the project
- [ ] Familiar with Expo Router file-based navigation
- [ ] Read the feature specification (spec.md)
- [ ] Read the research document (research.md)
- [ ] Read the data model (data-model.md)

## Implementation Sequence

Follow this order to minimize integration issues:

1. **State Management** (Rating Slice)
2. **i18n Translations**
3. **Analytics Events**
4. **UI Components** (RatingPrompt, FeedbackForm)
5. **Navigation Setup** (Expo Router routes)
6. **Entry Point** (CTA on Features screen)
7. **Testing** (Unit + E2E)

---

## Step 1: Create Rating Slice

### 1.1 Create Types File

**File**: `src/infra/store/slices/rating/rating.types.ts`

```typescript
export interface RatingState {
  hasBeenPrompted: boolean;
  lastPromptedAt: string | null;
  userResponse: UserResponse | null;
  feedbackSubmissions: FeedbackEntry[];
  promptConfig: PromptConfig;
}

export type UserResponse = 'yes' | 'no' | 'dismissed';

export interface PromptConfig {
  cooldownDays: number;
  minSessionsBeforePrompt: number;
  allowRetryAfterDismissal: boolean;
}

export interface FeedbackEntry {
  id: string;
  text: string;
  submittedAt: string;
  appVersion: string;
  deviceInfo: DeviceInfo;
  synced: boolean;
}

export interface DeviceInfo {
  platform: string;
  osVersion: string;
  deviceModel: string;
}

export interface RatingActions {
  recordPromptShown: () => void;
  recordUserResponse: (response: UserResponse) => void;
  submitFeedback: (text: string, deviceInfo: DeviceInfo, appVersion: string) => void;
  shouldShowPrompt: (currentSessionCount: number) => boolean;
  resetRatingState: () => void;
  updatePromptConfig: (config: Partial<PromptConfig>) => void;
}

export type RatingSlice = RatingState & RatingActions;
```

### 1.2 Create Slice Implementation

**File**: `src/infra/store/slices/rating/rating.slice.ts`

```typescript
import type { StateCreator } from 'zustand';

import type { StoreState } from '../../types/store.types';
import { sliceResetFns } from '../../utils/resetStore';

import type { RatingSlice, RatingState } from './rating.types';

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

export const createRatingSlice: StateCreator<
  StoreState,
  [['zustand/immer', never], never],
  [],
  RatingSlice
> = (set, get) => {
  sliceResetFns.add(() => {
    set(initialRatingState);
  });

  return {
    ...initialRatingState,

    recordPromptShown: () => {
      set({
        hasBeenPrompted: true,
        lastPromptedAt: new Date().toISOString(),
      });
    },

    recordUserResponse: (response) => {
      set({ userResponse: response });
    },

    submitFeedback: (text, deviceInfo, appVersion) => {
      set((state) => {
        state.feedbackSubmissions.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text,
          submittedAt: new Date().toISOString(),
          appVersion,
          deviceInfo,
          synced: false,
        });
      });
    },

    shouldShowPrompt: (currentSessionCount) => {
      const state = get();
      const { hasBeenPrompted, lastPromptedAt, userResponse, promptConfig } = state;

      // Check minimum sessions requirement
      if (currentSessionCount < promptConfig.minSessionsBeforePrompt) {
        return false;
      }

      // If never prompted, show it
      if (!hasBeenPrompted) {
        return true;
      }

      // If user dismissed and config doesn't allow retry
      if (userResponse === 'dismissed' && !promptConfig.allowRetryAfterDismissal) {
        return false;
      }

      // Check cooldown period
      if (lastPromptedAt) {
        const daysSinceLastPrompt = Math.floor(
          (Date.now() - new Date(lastPromptedAt).getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceLastPrompt < promptConfig.cooldownDays) {
          return false;
        }
      }

      return true;
    },

    resetRatingState: () => {
      set(initialRatingState);
    },

    updatePromptConfig: (config) => {
      set((state) => {
        state.promptConfig = { ...state.promptConfig, ...config };
      });
    },
  };
};
```

### 1.3 Create Index File

**File**: `src/infra/store/slices/rating/index.ts`

```typescript
export * from './rating.slice';
export * from './rating.types';
```

### 1.4 Integrate with Main Store

**File**: `src/infra/store/store.ts` (MODIFY)

```typescript
// Add import
import { createRatingSlice, type RatingSlice } from './slices/rating';

// Add to StoreState interface
export interface StoreState extends
  AppSlice,
  SessionSlice,
  RatingSlice  // ADD THIS
{}

// Add to store creator
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
          // ... existing fields
          // Rating slice
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

**Verify**: Run `yarn lint:ts` - should pass with no errors.

---

## Step 2: Add i18n Translations

**File**: `src/infra/i18n/resources/en/translation.json` (MODIFY)

Add these keys to the JSON file:

```json
{
  "ratingPrompt": {
    "title": "Rate Our App",
    "question": "Do you like this app?",
    "yes": "Yes, I love it!",
    "no": "Not really"
  },
  "feedbackForm": {
    "title": "Help us improve",
    "subtitle": "Tell us what we can do better",
    "placeholder": "Your feedback helps us make the app better...",
    "submit": "Submit Feedback",
    "cancel": "Cancel",
    "confirmation": "Thank you for your feedback!",
    "characterCount": "{{current}}/{{max}} characters"
  }
}
```

**Verify**: Run `yarn lint` - ESLint should validate i18n keys.

---

## Step 3: Add Analytics Events

**File**: `src/infra/analytics/analytics.types.ts` (MODIFY)

Add to `EventNames` type:

```typescript
export type EventNames =
  // ... existing events
  // App Rating
  | 'rating-prompt-viewed'
  | 'rating-prompt-response-yes'
  | 'rating-prompt-response-no'
  | 'rating-prompt-dismissed'
  | 'rating-modal-shown'
  | 'rating-modal-unavailable'
  | 'feedback-form-viewed'
  | 'feedback-form-submitted'
  | 'feedback-form-cancelled';
```

**Verify**: TypeScript should recognize new event names in Analytics.trackEvent() calls.

---

## Step 4: Create UI Components

### 4.1 Create RatingPrompt Component

**File**: `src/features/appRating/components/RatingPrompt/RatingPrompt.tsx`

```typescript
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useAppStoreReview } from '$features/storeRating/hooks/useAppStoreReview';
import { Analytics } from '$infra/analytics';
import { useStore } from '$infra/store';
import { Box, Button, Text } from '$shared/uiKit';

export const RatingPrompt = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isStoreReviewAvailable, requestStoreReview } = useAppStoreReview();

  const recordPromptShown = useStore((state) => state.recordPromptShown);
  const recordUserResponse = useStore((state) => state.recordUserResponse);

  useEffect(() => {
    recordPromptShown();
    Analytics.trackEvent('rating-prompt-viewed');
  }, [recordPromptShown]);

  const handleYesPress = async () => {
    recordUserResponse('yes');
    Analytics.trackEvent('rating-prompt-response-yes');

    const isAvailable = await isStoreReviewAvailable();

    if (!isAvailable) {
      Analytics.trackEvent('rating-modal-unavailable');
      router.back();
      return;
    }

    Analytics.trackEvent('rating-modal-shown');
    await requestStoreReview();
    router.back();
  };

  const handleNoPress = () => {
    recordUserResponse('no');
    Analytics.trackEvent('rating-prompt-response-no');
    router.push('/features/(appRating)/feedback');
  };

  return (
    <View style={styles.container}>
      <Box px="spacing_16" py="spacing_24">
        <Text variant="title" style={styles.title}>
          {t('ratingPrompt.title')}
        </Text>

        <Text variant="large" style={styles.question}>
          {t('ratingPrompt.question')}
        </Text>

        <Box mt="spacing_24" gap="spacing_12">
          <Button.Primary onPress={handleYesPress}>
            {t('ratingPrompt.yes')}
          </Button.Primary>

          <Button.Secondary onPress={handleNoPress}>
            {t('ratingPrompt.no')}
          </Button.Secondary>
        </Box>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.spacing_16,
  },
  question: {
    textAlign: 'center',
  },
}));
```

### 4.2 Create FeedbackForm Component

**File**: `src/features/appRating/components/FeedbackForm/FeedbackForm.tsx`

```typescript
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Analytics } from '$infra/analytics';
import { useStore } from '$infra/store';
import { Box, Button, Text } from '$shared/uiKit';

const MAX_CHARACTERS = 500;

export const FeedbackForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = useStore((state) => state.submitFeedback);

  useEffect(() => {
    Analytics.trackEvent('feedback-form-viewed');
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const deviceInfo = {
      platform: Platform.OS,
      osVersion: Platform.Version.toString(),
      deviceModel: Device.modelName || 'Unknown',
    };

    const appVersion = Application.nativeApplicationVersion || '0.0.0';

    submitFeedback(feedbackText, deviceInfo, appVersion);

    Analytics.trackEvent('feedback-form-submitted', {
      hasText: feedbackText.length > 0,
      textLength: feedbackText.length,
    });

    // Show confirmation (could use toast instead)
    alert(t('feedbackForm.confirmation'));

    setIsSubmitting(false);
    router.back();
  };

  const handleCancel = () => {
    Analytics.trackEvent('feedback-form-cancelled');
    router.back();
  };

  const characterCount = `${feedbackText.length}/${MAX_CHARACTERS}`;

  return (
    <View style={styles.container}>
      <Box px="spacing_16" py="spacing_24">
        <Text variant="title" style={styles.title}>
          {t('feedbackForm.title')}
        </Text>

        <Text variant="body" style={styles.subtitle}>
          {t('feedbackForm.subtitle')}
        </Text>

        <Box mt="spacing_16">
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            maxLength={MAX_CHARACTERS}
            placeholder={t('feedbackForm.placeholder')}
            value={feedbackText}
            onChangeText={setFeedbackText}
            autoFocus
          />

          <Text variant="small" style={styles.characterCount}>
            {t('feedbackForm.characterCount', {
              current: feedbackText.length,
              max: MAX_CHARACTERS,
            })}
          </Text>
        </Box>

        <Box mt="spacing_24" gap="spacing_12">
          <Button.Primary onPress={handleSubmit} disabled={isSubmitting}>
            {t('feedbackForm.submit')}
          </Button.Primary>

          <Button.Text onPress={handleCancel} disabled={isSubmitting}>
            {t('feedbackForm.cancel')}
          </Button.Text>
        </Box>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.spacing_8,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.text_muted,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.radius_8,
    padding: theme.spacing.spacing_12,
    backgroundColor: theme.colors.bg,
    color: theme.colors.text,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  characterCount: {
    textAlign: 'right',
    marginTop: theme.spacing.spacing_4,
    color: theme.colors.text_muted,
  },
}));
```

### 4.3 Create Index File

**File**: `src/features/appRating/index.ts`

```typescript
export * from './components/RatingPrompt/RatingPrompt';
export * from './components/FeedbackForm/FeedbackForm';
```

**Verify**: Components should render without TypeScript errors.

---

## Step 5: Setup Navigation Routes

### 5.1 Create Layout

**File**: `src/app/(protected)/(tabs)/features/(appRating)/_layout.tsx`

```typescript
import { Stack } from 'expo-router';

const AppRatingLayout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
  );
};

export default AppRatingLayout;
```

### 5.2 Create Prompt Screen

**File**: `src/app/(protected)/(tabs)/features/(appRating)/prompt.tsx`

```typescript
import { Screen } from '$shared/components';
import { RatingPrompt } from '$features/appRating';

const RatingPromptScreen = () => {
  return (
    <Screen edges={['top', 'bottom']} testID="rating-prompt-screen">
      <RatingPrompt />
    </Screen>
  );
};

export default RatingPromptScreen;
```

### 5.3 Create Feedback Screen

**File**: `src/app/(protected)/(tabs)/features/(appRating)/feedback.tsx`

```typescript
import { Screen } from '$shared/components';
import { FeedbackForm } from '$features/appRating';

const FeedbackFormScreen = () => {
  return (
    <Screen edges={['top', 'bottom']} testID="feedback-form-screen">
      <FeedbackForm />
    </Screen>
  );
};

export default FeedbackFormScreen;
```

**Verify**: Navigate to `/features/(appRating)/prompt` in development - screen should render.

---

## Step 6: Add Entry Point

**File**: `src/app/(protected)/(tabs)/features/index.tsx` (MODIFY)

Add the CTA button below the blog post section:

```typescript
// Add at the top
import { useStore } from '$infra/store';

// Inside component, after existing navigation functions
const goToRatingPrompt = () => {
  router.push('/features/(appRating)/prompt');
};

// Inside JSX, after the blog post section and before Notifications
<View style={styles.section}>
  <Text variant="large">{t('featuresScreen.appRating.title')}</Text>

  <Box self="flex-start" mt="spacing_8">
    <Button.Text onPress={goToRatingPrompt}>
      {t('featuresScreen.appRating.cta')}
    </Button.Text>
  </Box>
</View>
```

**Add to translation.json**:

```json
{
  "featuresScreen": {
    "appRating": {
      "title": "App Rating",
      "cta": "Rate this app"
    }
  }
}
```

**Verify**: Button appears on Features screen and navigates to rating prompt.

---

## Step 7: Add Tests

### 7.1 Rating Slice Tests

**File**: `src/infra/store/slices/rating/rating.slice.test.ts`

```typescript
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createRatingSlice } from './rating.slice';
import type { RatingSlice } from './rating.types';

const createTestStore = () => {
  return createStore<RatingSlice>()(
    immer((...a) => ({
      ...createRatingSlice(...a),
    }))
  );
};

describe('RatingSlice', () => {
  it('should have correct initial state', () => {
    const store = createTestStore();
    const state = store.getState();

    expect(state.hasBeenPrompted).toBe(false);
    expect(state.lastPromptedAt).toBeNull();
    expect(state.userResponse).toBeNull();
    expect(state.feedbackSubmissions).toEqual([]);
  });

  it('should record prompt shown', () => {
    const store = createTestStore();

    store.getState().recordPromptShown();

    expect(store.getState().hasBeenPrompted).toBe(true);
    expect(store.getState().lastPromptedAt).toBeTruthy();
  });

  it('should record user response', () => {
    const store = createTestStore();

    store.getState().recordUserResponse('yes');

    expect(store.getState().userResponse).toBe('yes');
  });

  it('should submit feedback', () => {
    const store = createTestStore();

    const deviceInfo = {
      platform: 'ios',
      osVersion: '17.0',
      deviceModel: 'iPhone 15',
    };

    store.getState().submitFeedback('Great app!', deviceInfo, '1.0.0');

    const submissions = store.getState().feedbackSubmissions;
    expect(submissions).toHaveLength(1);
    expect(submissions[0].text).toBe('Great app!');
    expect(submissions[0].deviceInfo.platform).toBe('ios');
  });

  it('should determine if prompt should be shown', () => {
    const store = createTestStore();

    // Should not show before min sessions
    expect(store.getState().shouldShowPrompt(2)).toBe(false);

    // Should show after min sessions
    expect(store.getState().shouldShowPrompt(3)).toBe(true);
  });
});
```

### 7.2 E2E Test

**File**: `tests/e2e/appRating.yaml`

```yaml
appId: com.example.rnstarter.dev
---
- launchApp
- tapOn: "Features"
- tapOn: "Rate this app"
- assertVisible: "Do you like this app?"
- tapOn: "Not really"
- assertVisible: "Help us improve"
- inputText: "Test feedback"
- tapOn: "Submit Feedback"
- assertVisible: "Thank you for your feedback!"
```

**Run Tests**:
```bash
yarn test  # Unit tests
yarn test:e2e  # Maestro E2E test
```

---

## Verification Checklist

- [ ] `yarn lint:ts` passes
- [ ] `yarn lint` passes
- [ ] `yarn test` passes (including rating slice tests)
- [ ] CTA button appears on Features screen
- [ ] Tapping CTA navigates to rating prompt
- [ ] Tapping "Yes" shows native rating modal (on device)
- [ ] Tapping "No" navigates to feedback form
- [ ] Feedback form accepts and submits text
- [ ] Feedback form accepts empty submission
- [ ] Analytics events fire in PostHog dashboard
- [ ] State persists across app restarts
- [ ] E2E test passes with Maestro

---

## Common Issues & Solutions

### Issue: Native modal doesn't appear

**Solution**: Ensure you're running on a development build, not Expo Go. The native modal requires custom development builds.

### Issue: TypeScript errors in store

**Solution**: Run `yarn lint:ts` to see specific errors. Ensure RatingSlice is added to StoreState interface.

### Issue: Translations not showing

**Solution**: Check that translation keys match exactly. Run `yarn lint` to validate i18n keys.

### Issue: Analytics events not tracked

**Solution**: Check PostHog configuration in `.env.development`. Ensure `productTrackingClient` is initialized.

### Issue: State not persisting

**Solution**: Verify `partialize` in store.ts includes all RatingState fields.

---

## Next Steps

After implementation is complete:

1. Run `/speckit.tasks` to generate task breakdown
2. Create PR against `develop` branch
3. Ensure CI passes (quality workflow)
4. Request code review
5. Address feedback and merge

---

## Resources

- Feature spec: [spec.md](./spec.md)
- Research doc: [research.md](./research.md)
- Data model: [data-model.md](./data-model.md)
- Expo Router docs: https://docs.expo.dev/router/
- Zustand docs: https://zustand-demo.pmnd.rs/
- expo-store-review: https://docs.expo.dev/versions/latest/sdk/storereview/
