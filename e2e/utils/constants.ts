/* eslint-disable import/no-extraneous-dependencies */

import { device } from 'detox';

// Platform detection
export const platform = device.getPlatform();
export const isIosTest = platform === 'ios';
export const isAndroidTest = platform === 'android';

// Shared values
export const START_DELAY = 5000;

// Packager URL
const getDeepLinkUrl = (url: string) =>
  `exp+rn-starter://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = () =>
  `http://10.0.2.2:19000/index.bundle?platform=${platform}&dev=true&minify=false&disableOnboarding=1`;

export const packagerUrl = getDeepLinkUrl(getDevLauncherPackagerUrl());

console.log('packagerUrl', packagerUrl);
