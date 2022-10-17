import { registerDevMenuItems } from 'expo-dev-menu';
import { ReactElement, Suspense, useState } from 'react';

import FallbackLoader from '$components/ui/FallbackLoader';
import useRunOnMount from '$hooks/useRunOnMount';

import DebugStack from './navigation/DebugStack';

type SandboxProps = {
  children: ReactElement;
};

const Sandbox = ({ children }: SandboxProps) => {
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
      // TODO(error): Send to error monitoring
    });
  });

  if (!isShown) {
    return children;
  }

  return (
    <Suspense fallback={<FallbackLoader />}>
      <DebugStack />
    </Suspense>
  );
};

export default Sandbox;
