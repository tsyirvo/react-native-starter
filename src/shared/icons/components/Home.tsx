import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

/* eslint-disable react/jsx-props-no-spreading */
const Home = ({ color = '#0C0D0F', ...props }: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        d="m23.121 9.069-7.585-7.586a5.008 5.008 0 0 0-7.072 0L.879 9.069A2.978 2.978 0 0 0 0 11.19v9.817a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V11.19a2.978 2.978 0 0 0-.879-2.121ZM15 22.007H9v-3.934a3 3 0 0 1 6 0Zm7-1a1 1 0 0 1-1 1h-4v-3.934a5 5 0 0 0-10 0v3.934H3a1 1 0 0 1-1-1V11.19a1.008 1.008 0 0 1 .293-.707L9.878 2.9a3.008 3.008 0 0 1 4.244 0l7.585 7.586a1.008 1.008 0 0 1 .293.704Z"
        fill={color}
      />
    </Svg>
  );
};

export { Home };
