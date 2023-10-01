import { ScrollView } from 'react-native';

import { Box } from '$shared/uiKit/primitives';
import { SafeView } from '$shared/uiKit/SafeView';

import { Components } from './components/Components';
import { Core } from './components/Core';
import { Flows } from './components/Flows';

export function Menu() {
  return (
    <SafeView edges={['bottom']}>
      <ScrollView>
        <Box p="spacing_24">
          <Core />

          <Components />

          <Flows />
        </Box>
      </ScrollView>
    </SafeView>
  );
}
