import { registerDevMenuItems } from 'expo-dev-menu';
import { ReactElement, useState } from 'react';

import { Logger } from '$core/logger';
import { useRunOnMount } from '$shared/hooks/useRunOnMount';

import { DebugStack } from './navigation/DebugStack';

type SandboxProps = {
  children: ReactElement;
};

export const Sandbox = ({ children }: SandboxProps) => {
  const [isShown, setIsShown] = useState(false);

  useRunOnMount(() => {
    const devMenuItems = [
      {
        name: 'Toggle the Sandbox',
        callback: () => setIsShown((prevState) => !prevState),
      },
    ];

    (async () => {
      await registerDevMenuItems(devMenuItems);
    })().catch(() => {
      Logger.dev('Failed to register the Sandbox in the Dev Menu');
    });
  });

  if (!isShown) {
    return children;
  }

  return <DebugStack />;
};
