import { useTranslation } from 'react-i18next';

import { isIOS } from '$core/constants';
import { Text } from '$shared/ui/primitives';

export const Informations = () => {
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
