import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronDownProps = SvgProps & {
  color?: string,
};

const SvgChevronDown = ({ color, ...props }: SvgChevronDownProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <Path
      d="M14.5 8.5l-4 4-4-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgChevronDown;
