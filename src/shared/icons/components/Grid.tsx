import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
const Grid = (props: SvgProps) => {
  return (
    <Svg height={21} width={21} {...props}>
      <Path
        d="M12.5 3.5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm-8 0h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm8 8h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm-8 0h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export { Grid };
