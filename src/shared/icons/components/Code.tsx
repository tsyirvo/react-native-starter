/* eslint-disable react/jsx-props-no-spreading */

import * as React from 'react';
import Svg, { SvgProps, G, Line, Polyline } from 'react-native-svg';

type SvgCodeProps = SvgProps & {
  color?: string;
};
const SvgCode = ({ color, ...props }: SvgCodeProps) => (
  <Svg accessibilityRole="image" height="21px" width="21px" {...props}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 3)"
    >
      <Line x1={10.5} x2={6.5} y1={0.5} y2={14.5} />

      <Polyline
        points="7.328 2.672 7.328 8.328 1.672 8.328"
        transform="rotate(135 4.5 5.5)"
      />

      <Polyline
        points="15.328 6.672 15.328 12.328 9.672 12.328"
        transform="scale(1 -1) rotate(-45 -10.435 0)"
      />
    </G>
  </Svg>
);

export default SvgCode;
