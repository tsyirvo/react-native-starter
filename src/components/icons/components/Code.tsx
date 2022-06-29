import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

type SvgCodeProps = SvgProps & {
  color?: string;
};

const SvgCode = ({ color, ...props }: SvgCodeProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <G
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12.5 3.5l-4 14M6.5 12.5l-4-4 4-4M14.5 16.5l4-4-4-4" />
    </G>
  </Svg>
);

export default SvgCode;
