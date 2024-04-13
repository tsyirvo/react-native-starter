module.exports = {
  checkForUpdateAsync: jest.fn(),
  fetchUpdateAsync: jest.fn(),
  reloadAsync: jest.fn(),
  useUpdates: () => ({
    currentlyRunning: {
      isEmbeddedLaunch: false,
    },
  }),
};
