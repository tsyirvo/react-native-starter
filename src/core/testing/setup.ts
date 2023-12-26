import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
