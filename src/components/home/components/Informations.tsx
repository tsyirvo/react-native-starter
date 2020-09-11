import React, { ReactElement } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Title, Text } from '@shared/primitives';

const Informations = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Title fontWeight={600} mt={25} mb={10}>
        {t('home.storybook_title')}
      </Title>
      <Text>
        {t('home.storybook_content')}
        {Platform.OS === 'ios' ? ' Cmd+R' : ' Cmd+M'}
      </Text>

      <Title fontWeight={600} mt={25} mb={10}>
        {t('home.test_title')}
      </Title>
      <Text>{t('home.test_content')}</Text>

      <Title fontWeight={600} mt={25} mb={10}>
        {t('home.formatting_title')}
      </Title>
      <Text>{t('home.formatting_content')}</Text>
    </>
  );
};

export default Informations;
