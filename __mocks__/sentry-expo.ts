module.exports = {
  Native: {
    ReactNavigationInstrumentation: jest.fn().mockImplementation(() => {}),
    setUser: jest.fn(),
    configureScope: jest.fn(),
    captureEvent: jest.fn(),
    captureException: jest.fn(),
    captureMessage: jest.fn(),
    setTag: jest.fn(),
    setContext: jest.fn(),
    addBreadcrumb: jest.fn(),
    withScope: jest.fn(),
  },
};
