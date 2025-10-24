import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { ThemeColors } from '$domain/theme';

interface LoaderProps {
  delay?: number;
  size?: 'large' | 'small';
  color?: ThemeColors;
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

  const { theme } = useUnistyles();

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
        color={theme.colors[color]}
        size={size}
      />
    );

  return <View testID={testID} style={{ height: minHeight }} />;
};
