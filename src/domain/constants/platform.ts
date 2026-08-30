import { Platform } from 'react-native';

/* ***** *****  OS  ***** ***** */

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

/* ***** *****  Capabilities  ***** ***** */

/*
 * Liquid Glass is the translucent chrome introduced with iOS 26 (minimizable
 * tab bars, glass toolbars and bottom accessories). Older iOS versions and
 * every Android version render the platform default chrome instead, so any
 * prop that only exists on iOS 26 has to be gated behind this flag.
 */
const IOS_LIQUID_GLASS_MAJOR_VERSION = 26;

const iosMajorVersion = IS_IOS
  ? Number.parseInt(String(Platform.Version), 10)
  : Number.NaN;

export const SUPPORTS_LIQUID_GLASS =
  IS_IOS && iosMajorVersion >= IOS_LIQUID_GLASS_MAJOR_VERSION;
