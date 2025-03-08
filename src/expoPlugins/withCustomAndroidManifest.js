// eslint-disable-next-line
const { withAndroidManifest } = require('@expo/config-plugins');

// Needed for AppsFlyer SDK to work on Android
module.exports = function withCustomAndroidManifest(config) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;
    const manifest = androidManifest.manifest;

    // Ensure xmlns:tools is present in the <manifest> tag
    if (!manifest.$['xmlns:tools']) {
      manifest.$['xmlns:tools'] = 'http://schemas.android.com/tools';
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const application = manifest.application[0];

    // Add tools:replace attribute for dataExtractionRules and fullBackupContent
    application['$']['tools:replace'] =
      'android:dataExtractionRules, android:fullBackupContent';

    // Set dataExtractionRules and fullBackupContent as attributes within <application>
    application['$']['android:dataExtractionRules'] =
      '@xml/secure_store_data_extraction_rules';

    application['$']['android:fullBackupContent'] =
      '@xml/secure_store_backup_rules';

    return config;
  });
};
