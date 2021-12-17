/* eslint-disable import/no-mutable-exports */

import { Dimensions } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

// Reference device
const widthIphoneX = 375;
const heightIphoneX = 812;
let heightRatio = 1;
let widthRatio = 1;

export const getDimensionRatio = (): void => {
  if (deviceHeight !== heightIphoneX) {
    heightRatio = deviceHeight / heightIphoneX;
  }

  if (deviceWidth !== widthIphoneX) {
    widthRatio = deviceWidth / widthIphoneX;
  }
};

export { widthRatio, heightRatio, deviceWidth, deviceHeight };
