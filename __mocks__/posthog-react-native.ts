const mockPostHog = jest.fn().mockImplementation(() => ({
  getDistinctId: jest.fn(),
  identify: jest.fn(),
  reset: jest.fn(),
  capture: jest.fn(),
  reloadFeatureFlags: jest.fn(),
  getFeatureFlag: jest.fn(),
  getFeatureFlagPayload: jest.fn(),
}));

export default mockPostHog;
export const useFeatureFlag = jest.fn();
export const useFeatureFlagWithPayload = jest.fn();
