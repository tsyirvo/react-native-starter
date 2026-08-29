const mockPostHog = jest.fn().mockImplementation(() => ({
  capture: jest.fn(),
  getDistinctId: jest.fn(),
  getFeatureFlag: jest.fn(),
  getFeatureFlagPayload: jest.fn(),
  identify: jest.fn(),
  reloadFeatureFlags: jest.fn(),
  reset: jest.fn(),
}));

export default mockPostHog;
export const useFeatureFlag = jest.fn();
export const useFeatureFlagWithPayload = jest.fn();
