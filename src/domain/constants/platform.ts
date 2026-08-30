import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform } from 'react-native';

/* ***** *****  OS  ***** ***** */

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

/* ***** *****  Capabilities  ***** ***** */

export const SUPPORTS_LIQUID_GLASS = isLiquidGlassAvailable();
