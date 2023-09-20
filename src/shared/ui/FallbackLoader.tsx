import { useEffect, useState } from 'react';

import { Text } from '$shared/ui/primitives';

type FallbackLoaderProps = {
  delay?: number;
};

const DEFAULT_DELAY = 500;

export const FallbackLoader = ({
  delay = DEFAULT_DELAY,
}: FallbackLoaderProps) => {
  const [isShowingLoading, setIsShowingLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsShowingLoading(true), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  if (isShowingLoading) return <Text>Loading ...</Text>;

  return null;
};
