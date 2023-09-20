import { useTranslation } from 'react-i18next';

import { Text } from '$components/ui/primitives';
import { isIOS } from '$core/constants';

const Informations = () => {
  const { t } = useTranslation('homeScreen');

  return (
    <>
      <Text mb="global_8" mt="global_24" variant="large">
        {t('sandbox.title')}
      </Text>

      <Text>
        {t('sandbox.content', {
          command: isIOS ? 'Cmd+R' : 'Cmd+M',
        })}
      </Text>

      <Text mb="global_8" mt="global_24" variant="large">
        {t('tests.title')}
      </Text>

      <Text>{t('tests.content')}</Text>

      <Text mb="global_8" mt="global_24" variant="large">
        {t('formatting.title')}
      </Text>

      <Text>{t('formatting.content')}</Text>
    </>
  );
};

export default Informations;
