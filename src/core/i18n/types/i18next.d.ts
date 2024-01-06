import 'react-i18next';

import type appConfigEN from '../resources/en/appConfig.json';
import type commonEN from '../resources/en/common.json';
import type homeScreenEN from '../resources/en/homeScreen.json';
import type miscScreensEN from '../resources/en/miscScreens.json';
import type otherScreenEN from '../resources/en/otherScreen.json';
import type settingsEN from '../resources/en/settings.json';

// https://www.geodev.me/blog/type-check-translation-keys/

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof commonEN;
      homeScreen: typeof homeScreenEN;
      otherScreen: typeof otherScreenEN;
      miscScreens: typeof miscScreensEN;
      settings: typeof settingsEN;
      appConfig: typeof appConfigEN;
    };
  }
}
