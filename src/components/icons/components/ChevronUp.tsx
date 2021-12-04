import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgChevronUpProps = SvgProps & {
  color?: string,
};

const SvgChevronUp = ({ color, ...props }: SvgChevronUpProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <Path
      d="M6.5 12.5l4-4 4 4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgChevronUp;
