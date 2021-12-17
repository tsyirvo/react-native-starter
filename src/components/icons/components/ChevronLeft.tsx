import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronLeftProps = SvgProps & {
  color?: string,
};

const SvgChevronLeft = ({ color, ...props }: SvgChevronLeftProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <Path
      d="M11.5 14.5l-4-4 4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgChevronLeft;
