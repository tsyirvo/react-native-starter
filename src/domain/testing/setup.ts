/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-require-imports */

jest.mock(
  'react-native-safe-area-context',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@gorhom/bottom-sheet', () => require('@gorhom/bottom-sheet/mock'));
