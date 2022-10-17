module.exports = {
  getRemoteConfig: jest.fn(),
  fetchAndActivate: jest.fn(),
  fetchConfig: jest.fn(),
  getBoolean: () => true,
  getString: () => 'true',
  getNumber: () => 1,
  getValue: () => ({
    getSource: () => 'remote',
  }),
};
