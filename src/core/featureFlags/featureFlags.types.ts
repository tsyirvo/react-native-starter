import defaultConfig from './config';

export type { FirebaseOptions } from 'firebase/app';

export type FeatureFlagsType = keyof typeof defaultConfig;
