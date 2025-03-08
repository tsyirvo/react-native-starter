import type { ReactNode } from 'react';

import { Box } from '$shared/uiKit';

import { useBootstrapApp } from './hooks/useBootstrapApp';

type SplashscreenProps = {
  children: ReactNode;
};

export const Splashscreen = ({ children }: SplashscreenProps) => {
  const { onLayoutRootView } = useBootstrapApp();

  return (
    <Box flex={1} onLayout={onLayoutRootView}>
      {children}
    </Box>
  );
};
