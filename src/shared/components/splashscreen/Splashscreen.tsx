import type { ReactNode } from 'react';

import { Box } from '$shared/uiKit/primitives';

import { useLoadAssets } from './hooks/useLoadAssets';

type SplashscreenProps = {
  children: ReactNode;
};

export const Splashscreen = ({ children }: SplashscreenProps) => {
  const { onLayoutRootView } = useLoadAssets();

  return (
    <Box flex={1} onLayout={onLayoutRootView}>
      {children}
    </Box>
  );
};
