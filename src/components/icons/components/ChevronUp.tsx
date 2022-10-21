import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronUpProps = SvgProps & {
  color?: string,
};
const SvgChevronUp = ({ color, ...props }: SvgChevronUpProps) => (
  <Svg width="21px" height="21px" accessibilityRole="image" {...props}>
    <Path
      d="m.5 4.5 4-4 4 4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(6 8)"
    />
  </Svg>
);
export default SvgChevronUp;
