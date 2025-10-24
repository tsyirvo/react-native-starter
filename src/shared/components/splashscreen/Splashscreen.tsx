import { type ReactNode } from 'react';

import { Box } from '$shared/uiKit';

import { useBootstrapApp } from './hooks/useBootstrapApp';

interface SplashscreenProps {
  children: ReactNode;
}

export const Splashscreen = ({ children }: SplashscreenProps) => {
  const { isAppReady, onLayoutRootView } = useBootstrapApp();

  return <Box onLayout={onLayoutRootView}>{isAppReady ? children : null}</Box>;
};
