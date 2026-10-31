import fs from 'node:fs';
import path from 'node:path';
import { withDangerousMod } from 'expo/config-plugins';

// JS, not TS: Expo only transpiles app.config.ts itself, not the files it imports
const DEBUG_ASSETS_PATH = 'android/app/src/debug/assets';
const MARKER_FILE_NAME = 'EXDevMenuApp.android.js';

/**
 * Restores the dev-client marker in debug APKs only. `eas upload` (used by the
 * build cache) flags an APK as a dev client only if it contains
 * `assets/EXDevMenuApp.android.js`, which expo-dev-menu stopped shipping in
 * SDK 58. Without it, uploaded Android builds never match the cache lookup.
 * Remove once eas-cli no longer checks for this file.
 *
 * @type {import('expo/config-plugins').ConfigPlugin}
 */
export const withDevClientBuildMarker = (config) =>
  withDangerousMod(config, [
    'android',
    async (modConfig) => {
      const folder = path.resolve(
        modConfig.modRequest.projectRoot,
        DEBUG_ASSETS_PATH,
      );
      await fs.promises.mkdir(folder, { recursive: true });
      await fs.promises.writeFile(
        path.resolve(folder, MARKER_FILE_NAME),
        '// Dev-client marker for `eas upload`; see plugins/withDevClientBuildMarker.js.\n',
      );

      return modConfig;
    },
  ]);
