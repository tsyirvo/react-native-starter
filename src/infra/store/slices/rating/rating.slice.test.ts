import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { StoreState } from '../../types/store.types';

import { createRatingSlice } from './rating.slice';

const createTestStore = () => {
  return create<StoreState>()(
    immer((...a) => ({
      ...createRatingSlice(...a),
      // Add minimal required properties for other slices to satisfy StoreState
      appTheme: 'dark' as const,
      isBootstrappingApplication: false,
      setAppTheme: () => null,
      setIsBootstrappingApplication: () => null,
      isUserLoggedIn: false,
      setIsUserLoggedIn: () => null,
    })),
  );
};

describe('RatingSlice', () => {
  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const store = createTestStore();
      const state = store.getState();

      expect(state.hasBeenPrompted).toBe(false);
      expect(state.lastPromptedAt).toBeNull();
      expect(state.userResponse).toBeNull();
      expect(state.feedbackSubmissions).toEqual([]);
      expect(state.promptConfig).toEqual({
        cooldownDays: 10,
        minSessionsBeforePrompt: 3,
        allowRetryAfterDismissal: true,
      });
    });
  });

  describe('recordPromptShown', () => {
    it('should update hasBeenPrompted to true', () => {
      const store = createTestStore();

      store.getState().recordPromptShown();

      expect(store.getState().hasBeenPrompted).toBe(true);
    });

    it('should set lastPromptedAt to current timestamp', () => {
      const store = createTestStore();
      const beforeCall = new Date().toISOString();

      store.getState().recordPromptShown();

      const afterCall = new Date().toISOString();
      const lastPrompted = store.getState().lastPromptedAt;

      expect(lastPrompted).toBeTruthy();
      expect(lastPrompted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);

      // Should be between before and after
      if (lastPrompted) {
        expect(new Date(lastPrompted).getTime()).toBeGreaterThanOrEqual(
          new Date(beforeCall).getTime(),
        );

        expect(new Date(lastPrompted).getTime()).toBeLessThanOrEqual(
          new Date(afterCall).getTime(),
        );
      }
    });
  });

  describe('recordUserResponse', () => {
    it('should record yes response', () => {
      const store = createTestStore();

      store.getState().recordUserResponse('yes');

      expect(store.getState().userResponse).toBe('yes');
    });

    it('should record no response', () => {
      const store = createTestStore();

      store.getState().recordUserResponse('no');

      expect(store.getState().userResponse).toBe('no');
    });

    it('should record dismissed response', () => {
      const store = createTestStore();

      store.getState().recordUserResponse('dismissed');

      expect(store.getState().userResponse).toBe('dismissed');
    });
  });

  describe('shouldShowPrompt', () => {
    it('should return false when currentSessionCount < minSessionsBeforePrompt', () => {
      const store = createTestStore();

      expect(store.getState().shouldShowPrompt(2)).toBe(false);
      expect(store.getState().shouldShowPrompt(1)).toBe(false);
      expect(store.getState().shouldShowPrompt(0)).toBe(false);
    });

    it('should return true when never prompted and session count is sufficient', () => {
      const store = createTestStore();

      expect(store.getState().shouldShowPrompt(3)).toBe(true);
      expect(store.getState().shouldShowPrompt(4)).toBe(true);
    });

    it('should return false when user dismissed and allowRetryAfterDismissal is false', () => {
      const store = createTestStore();

      // Set up state
      store.getState().recordPromptShown();
      store.getState().recordUserResponse('dismissed');
      store.getState().updatePromptConfig({ allowRetryAfterDismissal: false });

      expect(store.getState().shouldShowPrompt(10)).toBe(false);
    });

    it('should return false when within cooldown period', () => {
      const store = createTestStore();

      // Record prompt shown
      store.getState().recordPromptShown();

      // Should not show immediately (within cooldown)
      expect(store.getState().shouldShowPrompt(10)).toBe(false);
    });

    it('should return true when cooldown period has passed', () => {
      const store = createTestStore();

      // Manually set lastPromptedAt to 31 days ago
      const thirtyOneDaysAgo = new Date();

      thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

      store.setState({
        hasBeenPrompted: true,
        lastPromptedAt: thirtyOneDaysAgo.toISOString(),
      });

      expect(store.getState().shouldShowPrompt(10)).toBe(true);
    });
  });
});
