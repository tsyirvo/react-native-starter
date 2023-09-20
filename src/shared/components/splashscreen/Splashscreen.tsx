import React, { ReactNode } from 'react';

import { Box } from '$shared/ui/primitives';

import { useLoadAssets } from './hooks/useLoadAssets';

type SplashscreenProps = {
  children: ReactNode;
};

export const Splashscreen = ({ children }: SplashscreenProps) => {
  const { areFontsLoaded, onLayoutRootView } = useLoadAssets();

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <Box flex={1} onLayout={onLayoutRootView}>
      {children}
    </Box>
  );
};
