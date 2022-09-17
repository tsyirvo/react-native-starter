import { Text } from '$components/ui/primitives';
import { isIOS } from '$core/constants';
import i18n from '$i18n/config';

const Informations = () => (
  <>
    <Text mb="global_8" mt="global_24" variant="large">
      {i18n.t('home.sandbox.title')}
    </Text>

    <Text>
      {i18n.t('home.sandbox.content', {
        command: isIOS ? 'Cmd+R' : 'Cmd+M',
      })}
    </Text>

    <Text mb="global_8" mt="global_24" variant="large">
      {i18n.t('home.tests.title')}
    </Text>

    <Text>{i18n.t('home.tests.content')}</Text>

    <Text mb="global_8" mt="global_24" variant="large">
      {i18n.t('home.formatting.title')}
    </Text>

    <Text>{i18n.t('home.formatting.content')}</Text>
  </>
);

export default Informations;
