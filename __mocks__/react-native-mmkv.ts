const mmkvMock = (() => {
  const data = {};
  const MMKV = {
    getBoolean: (key: string) => data[key],
    getString: (key: string) => data[key],
    getNumber: (key: string) => data[key],
    set: (key: string, value: boolean | number | string) => (data[key] = value),
    getAllKeys: () => Object.keys(data),
    delete: (key: string) => (data[key] = undefined),
  };
  return { MMKV };
})();

module.exports = {
  MMKV: jest.fn().mockImplementation(() => mmkvMock),
};
