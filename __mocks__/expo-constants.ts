export default {
  expoConfig: {
    android: {
      versionCode: 1,
    },
    extra: {
      eas: {
        appName: '',
        env: 'production',
        isDebug: false,
        isTest: true,
        projectId: '',
        sentryDsn: undefined,
      },
    },
    ios: {
      buildNumber: 1,
    },
    runtimeVersion: '1.0.0',
    version: '2.0.0',
  },
};
