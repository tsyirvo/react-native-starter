import { withGradleProperties } from 'expo/config-plugins';

// JS, not TS: Expo only transpiles app.config.ts itself, not the files it imports
const JVM_ARGS_KEY = 'org.gradle.jvmargs';
// The template default (2 GB heap) runs out of memory while merging dex files
const JVM_ARGS_VALUE = '-Xmx4g -XX:MaxMetaspaceSize=1g -Dfile.encoding=UTF-8';

/** @type {import('expo/config-plugins').ConfigPlugin} */
export const withAndroidGradleMemory = (config) =>
  withGradleProperties(config, (modConfig) => {
    const existing = modConfig.modResults.find(
      (item) => item.type === 'property' && item.key === JVM_ARGS_KEY,
    );

    if (existing?.type === 'property') {
      existing.value = JVM_ARGS_VALUE;
    } else {
      modConfig.modResults.push({
        key: JVM_ARGS_KEY,
        type: 'property',
        value: JVM_ARGS_VALUE,
      });
    }

    return modConfig;
  });
