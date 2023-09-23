import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
const Code = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 21 21" {...props}>
      <G
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="m12.5 3.5-4 14M6.5 12.5l-4-4 4-4M14.5 16.5l4-4-4-4" />
      </G>
    </Svg>
  );
};

export { Code };
