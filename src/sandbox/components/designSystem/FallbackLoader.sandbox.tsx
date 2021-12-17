import { ScrollView } from 'react-native';

import FallbackLoader from '$components/ui/FallbackLoader';

import SandBoxItem from '../menu/components/SandboxItem';

const FallbackLoaderSandbox = () => (
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

export default FallbackLoaderSandbox;
