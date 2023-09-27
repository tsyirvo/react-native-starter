import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
function HeartRate(props: SvgProps) {
  return (
    <Svg viewBox="0 0 21 21" {...props}>
      <Path
        d="M3 10.5h2l2.5-6 2 12 3-9 2.095 6 1.405-3h2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export { HeartRate };
