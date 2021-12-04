/* eslint-disable import/no-extraneous-dependencies */

import { ReactElement, Suspense, useEffect, useState } from 'react';

import FallbackLoader from '$components/shared/FallbackLoader';

import DebugStack from './navigation/DebugStack';

type SandboxProps = {
  children: ReactElement;
};

const Sandbox = ({ children }: SandboxProps) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      const importDevMenu = async () => {
        await import('react-native-dev-menu').then((devMenu) => {
          // @ts-expect-error: Methods on dynamic import not recognized
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          devMenu.addItem('Toggle Sandbox', () =>
            setIsShown((prevState) => !prevState),
          );
        });
      };

      importDevMenu().catch((err) => {
        // TODO(error): Handle this error
        console.log('err', err);
      });
    }
  }, []);

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
