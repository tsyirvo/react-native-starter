jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('@gorhom/bottom-sheet', () => require('@gorhom/bottom-sheet/mock'));

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);
