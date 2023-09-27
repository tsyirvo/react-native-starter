import { ScrollView } from 'react-native';

import { Box } from '$shared/ui/primitives';
import { SafeView } from '$shared/ui/SafeView';

import { Components } from './components/Components';
import { Core } from './components/Core';
import { Flows } from './components/Flows';

export function Menu() {
  return <SafeView edges={['bottom']}>
    <ScrollView>
      <Box p="global_24">
        <Core />

        <Components />

        <Flows />
      </Box>
    </ScrollView>
         </SafeView>;
}
