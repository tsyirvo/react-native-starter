import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgLaptopProps = SvgProps & {
  color?: string,
};

const SvgLaptop = ({ color, ...props }: SvgLaptopProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" {...props}>
    <Path
      d="M4.5 4.485h11a1 1 0 011 1V13.5h-13V5.485a1 1 0 011-1zM3.118 17.5h13.764a1 1 0 00.894-1.447L16.5 13.5h-13l-1.276 2.553a1 1 0 00.894 1.447z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgLaptop;
