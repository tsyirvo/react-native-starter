import { ScrollView } from 'react-native';

import { Box } from '$components/ui/primitives';
import SafeView from '$components/ui/SafeView';

import Components from './Components';
import Core from './Core';
import Flows from './Flows';

const Menu = () => (
  <SafeView edges={['bottom']}>
    <ScrollView>
      <Box p="global_24">
        <Core />

        <Components />

        <Flows />
      </Box>
    </ScrollView>
  </SafeView>
);

export default Menu;
