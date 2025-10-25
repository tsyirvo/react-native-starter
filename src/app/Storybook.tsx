import { Suspense, lazy } from 'react';

import { config } from '$domain/constants';
import { Loader } from '$shared/uiKit';

const StorybookUI = lazy(() => import('../../.rnstorybook'));

const Storybook = () => {
  if (!config.isStorybookEnabled) return null;

  return (
    <Suspense fallback={<Loader delay={0} />}>
      <StorybookUI />
    </Suspense>
  );
};

export default Storybook;
