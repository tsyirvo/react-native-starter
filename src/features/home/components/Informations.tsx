import { useTranslation } from 'react-i18next';

import { Text } from '$shared/uiKit/primitives';

export const Informations = () => {
  const { t } = useTranslation();

  return (
    <>
      <Text mb="spacing_8" mt="spacing_24" variant="large">
        {t('homeScreen.storybook.title')}
      </Text>

      <Text>{t('homeScreen.storybook.content')}</Text>

      <Text mb="spacing_8" mt="spacing_24" variant="large">
        {t('homeScreen.tests.title')}
      </Text>

      <Text>{t('homeScreen.tests.content')}</Text>

      <Text mb="spacing_8" mt="spacing_24" variant="large">
        {t('homeScreen.formatting.title')}
      </Text>

      <Text>{t('homeScreen.formatting.content')}</Text>
    </>
  );
};
