export default () => ({
  setDefaults: jest.fn(),
  fetchAndActivate: jest.fn(),
  getValue: () => ({
    asBoolean: () => true,
    asString: () => 'true',
    asNumber: () => 1,
    getSource: () => 'remote',
  }),
});
