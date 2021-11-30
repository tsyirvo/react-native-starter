/* eslint-disable import/dynamic-import-chunkname */
/* eslint-disable import/no-extraneous-dependencies */

import React, {
  lazy,
  ReactElement,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { ScrollView } from 'react-native';

import FallbackLoader from '$components/shared/FallbackLoader';
import { Box } from '$components/shared/primitives';

const SpacesDebugPage = lazy(async () => import('./components/theme/Spaces'));

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
    <ScrollView>
      <Box>
        <Suspense fallback={<FallbackLoader />}>
          <SpacesDebugPage />
        </Suspense>
      </Box>
    </ScrollView>
  );
};

export default DebugMenu;
