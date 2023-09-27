import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { colors } from '$core/theme';

import { Box } from './primitives';

type FallbackLoaderProps = {
  delay?: number;
  size?: 'large' | 'small';
};

const SMALL_SIZE = 20;
const LARGE_SIZE = 36;
const DEFAULT_DELAY = 500;

export function FallbackLoader({
  delay = DEFAULT_DELAY,
  size = 'large',
}: FallbackLoaderProps) {
  const [isShowingLoading, setIsShowingLoading] = useState(false);

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
    return <ActivityIndicator color={colors.black} size={size} />;

  return <Box height={minHeight} />;
}
