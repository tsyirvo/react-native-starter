import React from 'react';
import { Platform } from 'react-native';

import { Title, Text } from '$shared/primitives';
import i18n from '$i18n/config';

const Informations = () => (
  <>
    <Title fontWeight={600} mt={25} mb={10}>
      {i18n.t('home.storybook_title')}
    </Title>
    <Text>
      {i18n.t('home.storybook_content')}
      {Platform.OS === 'ios' ? ' Cmd+R' : ' Cmd+M'}
    </Text>

    <Title fontWeight={600} mt={25} mb={10}>
      {i18n.t('home.test_title')}
    </Title>
    <Text>{i18n.t('home.test_content')}</Text>

    <Title fontWeight={600} mt={25} mb={10}>
      {i18n.t('home.formatting_title')}
    </Title>
    <Text>{i18n.t('home.formatting_content')}</Text>
  </>
);

export default Informations;
