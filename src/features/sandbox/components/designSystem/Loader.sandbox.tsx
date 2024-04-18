import { Loader } from '$shared/uiKit/Loader';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const LoaderSandbox = () => {
  return (
    <Screen>
      <SandBoxItem title="Loader default props">
        <Loader />
      </SandBoxItem>

      <SandBoxItem title="Loader without delay">
        <Loader delay={0} />
      </SandBoxItem>

      <SandBoxItem title="Loader with a 3sec delay">
        <Loader delay={3000} />
      </SandBoxItem>
    </Screen>
  );
};
