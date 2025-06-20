import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useAppTheme, type Colors } from '$domain/theme';

import { Box } from '../primitives';

interface LoaderProps {
  delay?: number;
  size?: 'large' | 'small';
  color?: Colors;
  testID?: string;
}

const SMALL_SIZE = 20;
const LARGE_SIZE = 36;
const DEFAULT_DELAY = 500;

export const Loader = ({
  delay = DEFAULT_DELAY,
  size = 'large',
  color = 'dark',
  testID = 'Loader',
}: LoaderProps) => {
  const [isShowingLoading, setIsShowingLoading] = useState(false);

  const { colors } = useAppTheme();

  const minHeight = size === 'large' ? LARGE_SIZE : SMALL_SIZE;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowingLoading(true);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  if (isShowingLoading)
    return (
      <ActivityIndicator
        testID={`${testID}ActivityIndicator`}
        color={colors[color]}
        size={size}
      />
    );

  return <Box testID={testID} height={minHeight} />;
};
