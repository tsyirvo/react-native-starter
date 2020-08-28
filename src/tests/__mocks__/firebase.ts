jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logEvent: jest.fn(),
    setUserProperties: jest.fn(),
    setUserId: jest.fn(),
    setCurrentScreen: jest.fn(),
  });
});

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    setUserId: jest.fn(),
    setAttributes: jest.fn(),
  });
});
