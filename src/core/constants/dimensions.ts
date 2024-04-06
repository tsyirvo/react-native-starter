import { Dimensions } from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export { DEVICE_WIDTH, DEVICE_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT };
