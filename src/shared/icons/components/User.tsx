import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const User = ({ fill = '#0C0D0F', ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 12a6 6 0 1 0-6-6 6.006 6.006 0 0 0 6 6Zm0-10a4 4 0 1 1-4 4 4 4 0 0 1 4-4ZM12 14a9.01 9.01 0 0 0-9 9 1 1 0 0 0 2 0 7 7 0 0 1 14 0 1 1 0 0 0 2 0 9.01 9.01 0 0 0-9-9Z"
      fill={fill}
    />
  </Svg>
);

export { User };
