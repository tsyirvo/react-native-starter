import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Reference device
const widthIphoneX = 375;
const heightIphoneX = 812;
let heightRatio = 1;
let widthRatio = 1;

export const getRatio = () => {
  if (height !== heightIphoneX) {
    heightRatio = height / heightIphoneX;
  }

  if (width !== widthIphoneX) {
    widthRatio = width / widthIphoneX;
  }
};

export { widthRatio, heightRatio };
