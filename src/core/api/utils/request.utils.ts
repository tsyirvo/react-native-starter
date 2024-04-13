import { Platform } from 'react-native';

import { config } from '$core/constants';

export function getAppIdentifier() {
  // com.tsyirvo.rnstarter/2.0.0(777)_ios
  return `${config.bundleId}/${config.version}${config.buildNumber ? `(${config.buildNumber})` : ''}_${Platform.OS}`;
}
