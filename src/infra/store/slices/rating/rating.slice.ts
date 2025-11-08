import { nanoid } from 'nanoid';
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
    cooldownDays: 10,
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
          id: nanoid(),
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
      const { hasBeenPrompted, lastPromptedAt, userResponse, promptConfig } =
        state;

      // Check minimum sessions requirement
      if (currentSessionCount < promptConfig.minSessionsBeforePrompt) {
        return false;
      }

      // If never prompted, show it
      if (!hasBeenPrompted) {
        return true;
      }

      // If user dismissed and config doesn't allow retry
      if (
        userResponse === 'dismissed' &&
        !promptConfig.allowRetryAfterDismissal
      ) {
        return false;
      }

      // Check cooldown period
      if (lastPromptedAt) {
        const daysSinceLastPrompt = Math.floor(
          (Date.now() - new Date(lastPromptedAt).getTime()) /
            (1000 * 60 * 60 * 24),
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
