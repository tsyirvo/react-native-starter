import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
const Laptop = (props: SvgProps) => {
  return (
    <Svg height={21} width={21} {...props}>
      <Path
        d="M4.5 4.485h11a1 1 0 0 1 1 1V13.5h-13V5.485a1 1 0 0 1 1-1zM3.118 17.5h13.764a1 1 0 0 0 .894-1.447L16.5 13.5h-13l-1.276 2.553a1 1 0 0 0 .894 1.447z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { Laptop };
