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
  submitFeedback: (
    text: string,
    deviceInfo: DeviceInfo,
    appVersion: string,
  ) => void;
  shouldShowPrompt: (currentSessionCount: number) => boolean;
  resetRatingState: () => void;
  updatePromptConfig: (config: Partial<PromptConfig>) => void;
}

export type RatingSlice = RatingState & RatingActions;
