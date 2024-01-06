import type { ReactNode } from 'react';
import React from 'react';

import { Box } from '$shared/uiKit/primitives';

import { useLoadAssets } from './hooks/useLoadAssets';

type SplashscreenProps = {
  children: ReactNode;
};

export function Splashscreen({ children }: SplashscreenProps) {
  const { areAssetsLoaded, onLayoutRootView } = useLoadAssets();

  if (!areAssetsLoaded) {
    return null;
  }

  return (
    <Box flex={1} onLayout={onLayoutRootView}>
      {children}
    </Box>
  );
}
