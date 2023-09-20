/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronRightProps = SvgProps & {
  color?: string;
};
const SvgChevronRight = ({ color, ...props }: SvgChevronRightProps) => (
  <Svg accessibilityRole="image" height="21px" width="21px" {...props}>
    <Path
      d="m.5 8.5 4-4-4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(9 6)"
    />
  </Svg>
);

export default SvgChevronRight;
