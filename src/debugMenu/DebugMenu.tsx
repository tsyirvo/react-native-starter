/* eslint-disable import/no-extraneous-dependencies */

import React, { ReactElement, Suspense, useEffect, useState } from 'react';

import FallbackLoader from '$components/shared/FallbackLoader';

import DebugStack from './navigation/DebugStack';

type DebugMenuProps = {
  children: ReactElement;
};

const DebugMenu = ({ children }: DebugMenuProps) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      const importDevMenu = async () => {
        await import('react-native-dev-menu').then((devMenu) => {
          // @ts-expect-error: Methods on dynamic import not recognized
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          devMenu.addItem('Toggle Dev Menu', () =>
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

export default DebugMenu;
