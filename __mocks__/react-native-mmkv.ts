const createMockStorage = () => {
  const data: Record<string, boolean | number | string> = {};

  return {
    getString: (key: string): string | undefined =>
      typeof data[key] === 'string' ? data[key] : undefined,
    getNumber: (key: string): number | undefined =>
      typeof data[key] === 'number' ? data[key] : undefined,
    getBoolean: (key: string): boolean | undefined =>
      typeof data[key] === 'boolean' ? data[key] : undefined,
    set: (key: string, value: boolean | number | string) => {
      data[key] = value;
    },
    contains: (key: string): boolean => key in data,
    getAllKeys: (): string[] => Object.keys(data),
    remove: (key: string): boolean => {
      const existed = key in data;
      delete data[key];
      return existed;
    },
    clearAll: () => {
      for (const key of Object.keys(data)) {
        delete data[key];
      }
    },
  };
};

export const createMMKV = jest
  .fn()
  .mockImplementation(() => createMockStorage());

export type MMKV = ReturnType<typeof createMockStorage>;

export interface Configuration {
  id?: string;
  encryptionKey?: string;
}
