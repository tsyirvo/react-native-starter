import React, { ReactElement } from 'react';
import { Platform } from 'react-native';

import getTranslations from '@utils/locales';

import { Title, Text } from '@shared/primitives';

const Informations = (): ReactElement => (
  <>
    <Title fontWeight={600} mt={25} mb={10}>
      {getTranslations('home', 'storybook_title')}
    </Title>
    <Text>
      {getTranslations('home', 'storybook_content')}
      {Platform.OS === 'ios' ? ' Cmd+R' : ' Cmd+M'}
    </Text>

    <Title fontWeight={600} mt={25} mb={10}>
      {getTranslations('home', 'test_title')}
    </Title>
    <Text>{getTranslations('home', 'test_content')}</Text>

    <Title fontWeight={600} mt={25} mb={10}>
      {getTranslations('home', 'formatting_title')}
    </Title>
    <Text>{getTranslations('home', 'formatting_content')}</Text>
  </>
);

export default Informations;
