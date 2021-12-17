import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronRightProps = SvgProps & {
  color?: string,
};

const SvgChevronRight = ({ color, ...props }: SvgChevronRightProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <Path
      d="M9.5 14.5l4-4-4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgChevronRight;
