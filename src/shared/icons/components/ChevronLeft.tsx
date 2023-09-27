import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
function ChevronLeft(props: SvgProps) {
  return (
    <Svg viewBox="0 0 21 21" {...props}>
      <Path
        d="m11.5 14.5-4-4 4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export { ChevronLeft };
