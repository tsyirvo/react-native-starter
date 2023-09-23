import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
const ChevronDown = (props: SvgProps) => {
  return (
    <Svg height={21} width={21} {...props}>
      <Path
        d="m14.5 8.5-4 4-4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { ChevronDown };
