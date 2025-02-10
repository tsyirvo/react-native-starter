const mockPostHog = jest.fn().mockImplementation(() => ({
  getDistinctId: jest.fn(),
  identify: jest.fn(),
  reset: jest.fn(),
  capture: jest.fn(),
  reloadFeatureFlags: jest.fn(),
}));

module.exports = mockPostHog;
module.exports.useFeatureFlag = jest.fn();
