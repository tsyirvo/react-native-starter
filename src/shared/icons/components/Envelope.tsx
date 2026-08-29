import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const Envelope = ({ fill = '#0C0D0F', ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      d="M19 1H5a5.006 5.006 0 0 0-5 5v12a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5ZM5 3h14a3 3 0 0 1 2.78 1.887l-7.658 7.659a3.007 3.007 0 0 1-4.244 0L2.22 4.887A3 3 0 0 1 5 3Zm14 18H5a3 3 0 0 1-3-3V7.5l6.464 6.46a5.007 5.007 0 0 0 7.072 0L22 7.5V18a3 3 0 0 1-3 3Z"
      fill={fill}
    />
  </Svg>
);

export { Envelope };
