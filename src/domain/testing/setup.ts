// @ts-expect-error: doesn't resolve types
import mockReactNativePermissions from 'react-native-permissions/mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-native-permissions', () => mockReactNativePermissions);
