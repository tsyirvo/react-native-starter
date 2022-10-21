import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgHeartRateProps = SvgProps & {
  color?: string,
};
const SvgHeartRate = ({ color, ...props }: SvgHeartRateProps) => (
  <Svg width="21px" height="21px" accessibilityRole="image" {...props}>
    <Path
      d="m0 6.5h2l2.5-6 2 12 3-9 2.095 6 1.405-3h2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(3 4)"
    />
  </Svg>
);
export default SvgHeartRate;
