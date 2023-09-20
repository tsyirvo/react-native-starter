import { ScrollView } from 'react-native';

import { FallbackLoader } from '$shared/ui/FallbackLoader';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const FallbackLoaderSandbox = () => (
  <ScrollView>
    <SandBoxItem title="FallbackLoader default props">
      <FallbackLoader />
    </SandBoxItem>

    <SandBoxItem title="FallbackLoader without delay">
      <FallbackLoader delay={0} />
    </SandBoxItem>

    <SandBoxItem title="FallbackLoader with a 3sec delay">
      <FallbackLoader delay={3000} />
    </SandBoxItem>
  </ScrollView>
);
