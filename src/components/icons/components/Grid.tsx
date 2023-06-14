import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

type SvgGridProps = SvgProps & {
  color?: string;
};
const SvgGrid = ({ color, ...props }: SvgGridProps) => (
  <Svg width="21px" height="21px" accessibilityRole="image" {...props}>
    <Path
      d="m9.5.5h4c.5522847 0 1 .44771525 1 1v4c0 .55228475-.4477153 1-1 1h-4c-.55228475 0-1-.44771525-1-1v-4c0-.55228475.44771525-1 1-1zm-8 0h4c.55228475 0 1 .44771525 1 1v4c0 .55228475-.44771525 1-1 1h-4c-.55228475 0-1-.44771525-1-1v-4c0-.55228475.44771525-1 1-1zm8 8h4c.5522847 0 1 .44771525 1 1v4c0 .5522847-.4477153 1-1 1h-4c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1zm-8 0h4c.55228475 0 1 .44771525 1 1v4c0 .5522847-.44771525 1-1 1h-4c-.55228475 0-1-.4477153-1-1v-4c0-.55228475.44771525-1 1-1z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(3 3)"
    />
  </Svg>
);
export default SvgGrid;
