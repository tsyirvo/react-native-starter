import { Platform } from 'react-native';

import { Text } from '$components/ui/primitives';
import i18n from '$i18n/config';

const Informations = () => (
  <>
    <Text variant="large" mt="global_24" mb="global_8">
      {i18n.t('home.storybook.title')}
    </Text>
    <Text>
      {i18n.t('home.storybook.content')}
      {Platform.OS === 'ios' ? ' Cmd+R' : ' Cmd+M'}
    </Text>

    <Text variant="large" mt="global_24" mb="global_8">
      {i18n.t('home.tests.title')}
    </Text>
    <Text>{i18n.t('home.tests.content')}</Text>

    <Text variant="large" mt="global_24" mb="global_8">
      {i18n.t('home.formatting.title')}
    </Text>
    <Text>{i18n.t('home.formatting.content')}</Text>
  </>
);

export default Informations;