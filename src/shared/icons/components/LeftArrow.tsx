import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
const LeftArrow = ({ fill = '#0C0D0F', ...props }: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="M17.17 24a1 1 0 0 1-.71-.29l-8.17-8.17a5 5 0 0 1 0-7.08L16.46.29a1 1 0 1 1 1.42 1.42L9.71 9.88a3 3 0 0 0 0 4.24l8.17 8.17a1 1 0 0 1 0 1.42 1 1 0 0 1-.71.29Z"
        fill={fill}
      />
    </Svg>
  );
};

export { LeftArrow };
