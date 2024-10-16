import * as DevClient from 'expo-dev-client';
import type { ReactElement } from 'react';
import { Suspense, useState } from 'react';

import { Logger } from '$core/logger';
import { useRunOnMount } from '$shared/hooks/useRunOnMount';
import { Loader } from '$shared/uiKit/Loader';

import { SuspendedDebugStack } from './navigation';

type SandboxProps = {
  children: ReactElement;
};

export const Sandbox = ({ children }: SandboxProps) => {
  const [isShown, setIsShown] = useState(false);

  useRunOnMount(() => {
    const devMenuItems = [
      {
        name: 'Toggle the Sandbox',
        callback: () => {
          setIsShown((prevState) => !prevState);
        },
      },
    ];

    (async () => {
      await DevClient.DevMenu.registerDevMenuItems(devMenuItems);
    })().catch(() => {
      Logger.dev('Failed to register the Sandbox in the Dev Menu');
    });
  });

  if (!isShown) {
    return children;
  }

  return (
    <Suspense fallback={<Loader />}>
      <SuspendedDebugStack />
    </Suspense>
  );
};
