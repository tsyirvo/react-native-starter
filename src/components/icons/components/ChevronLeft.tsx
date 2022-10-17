import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronLeftProps = SvgProps & {
  color?: string,
};
const SvgChevronLeft = ({ color, ...props }: SvgChevronLeftProps) => (
  <Svg width="21px" height="21px" accessibilityRole="image" {...props}>
    <Path
      d="m4.5 8.5-4-4 4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(7 6)"
    />
  </Svg>
);
export default SvgChevronLeft;
