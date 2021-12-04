import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgHeartRateProps = SvgProps & {
  color?: string,
};

const SvgHeartRate = ({ color, ...props }: SvgHeartRateProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <Path
      d="M3 10.5h2l2.5-6 2 12 3-9 2.095 6 1.405-3h2"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgHeartRate;
