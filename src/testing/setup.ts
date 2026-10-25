jest.mock(
  '$infra/config',
  () =>
    ({
      __esModule: true,
      config: {
        apiURL: 'https://api.example.com',
        buildNumber: '1',
        bundleId: 'com.example.starter',
        defaultLocale: 'en',
        env: 'production',
        isDebug: false,
        isStorybookEnabled: false,
        itunesItemId: '123456789',
        posthogApiKey: '',
        revenueCatAndroidApiKey: '',
        revenueCatAppleApiKey: '',
        runtimeVersion: '1.0.0',
        sentryDsn: '',
        supportedLocales: ['en', 'fr'],
        version: '2.0.0',
      },
      IS_ANDROID: false,
      IS_IOS: true,
      SUPPORTS_LIQUID_GLASS: false,
    }) satisfies typeof import('$infra/config') & { __esModule: boolean },
);

jest.mock(
  '$infra/logger',
  () =>
    ({
      Logger: {
        dev: jest.fn(),
        error: jest.fn(),
        networkError: jest.fn(),
        showToast: jest.fn(),
      },
    }) satisfies typeof import('$infra/logger'),
);

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);
