module.exports = {
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    reset: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {},
  })),
};
