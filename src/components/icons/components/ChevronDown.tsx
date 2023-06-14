import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronDownProps = SvgProps & {
  color?: string;
};
const SvgChevronDown = ({ color, ...props }: SvgChevronDownProps) => (
  <Svg width="21px" height="21px" accessibilityRole="image" {...props}>
    <Path
      d="m8.5.5-4 4-4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(6 8)"
    />
  </Svg>
);
export default SvgChevronDown;
