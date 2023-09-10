import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgLaptopProps = SvgProps & {
  color?: string;
};
const SvgLaptop = ({ color, ...props }: SvgLaptopProps) => (
  <Svg width="21px" height="21px" accessibilityRole="image" {...props}>
    <Path
      d="m2.5.48528137h11c.5522847 0 1 .44771525 1 1v8.01471863h-13v-8.01471863c0-.55228475.44771525-1 1-1zm-1.38196601 13.01471863h13.76393201c.5522848 0 1-.4477153 1-1 0-.1552451-.0361451-.3083582-.1055728-.4472136l-1.2763932-2.5527864h-13l-1.2763932 2.5527864c-.24698925.4939785-.0467649 1.0946515.44721359 1.3416408.13885544.0694277.2919685.1055728.4472136.1055728z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2 4)"
    />
  </Svg>
);
export default SvgLaptop;
