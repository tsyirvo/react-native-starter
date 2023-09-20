/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronUpProps = SvgProps & {
  color?: string;
};
const SvgChevronUp = ({ color, ...props }: SvgChevronUpProps) => (
  <Svg accessibilityRole="image" height="21px" width="21px" {...props}>
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
