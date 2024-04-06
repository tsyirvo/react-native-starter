import { Platform } from 'react-native';

/* ***** *****  OS  ***** ***** */

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IS_ANDROID = Platform.OS === 'android';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const IS_IOS = Platform.OS === 'ios';
