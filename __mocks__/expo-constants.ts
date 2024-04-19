module.exports = {
  expoConfig: {
    version: '2.0.0',
    runtimeVersion: '1.0.0',
    ios: {
      buildNumber: 1,
    },
    android: {
      versionCode: 1,
    },
    extra: {
      eas: {
        projectId: '',
        appName: '',
        env: 'production',
        isDebug: false,
        isTest: true,
        sentryDsn: undefined,
        mixpanelToken: undefined,
        flagsmithKey: undefined,
        oneSignalAppId: undefined,
      },
    },
  },
};
