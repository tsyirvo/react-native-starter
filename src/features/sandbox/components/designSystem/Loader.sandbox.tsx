import { ScrollView } from 'react-native';

import { Loader } from '$shared/uiKit/Loader';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function LoaderSandbox() {
  return (
    <ScrollView>
      <SandBoxItem title="Loader default props">
        <Loader />
      </SandBoxItem>

      <SandBoxItem title="Loader without delay">
        <Loader delay={0} />
      </SandBoxItem>

      <SandBoxItem title="Loader with a 3sec delay">
        <Loader delay={3000} />
      </SandBoxItem>
    </ScrollView>
  );
}
