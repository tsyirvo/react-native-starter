import React from 'react';
import { Platform } from 'react-native';

import { Title, Text } from '$shared/primitives';
import i18n from '$i18n/config';

const Informations = () => (
  <>
    <Title fontWeight={600} mt={25} mb={10}>
      {i18n.t('home.storybook.title')}
    </Title>
    <Text>
      {i18n.t('home.storybook.content')}
      {Platform.OS === 'ios' ? ' Cmd+R' : ' Cmd+M'}
    </Text>

    <Title fontWeight={600} mt={25} mb={10}>
      {i18n.t('home.tests.title')}
    </Title>
    <Text>{i18n.t('home.tests.content')}</Text>

    <Title fontWeight={600} mt={25} mb={10}>
      {i18n.t('home.formatting.title')}
    </Title>
    <Text>{i18n.t('home.formatting.content')}</Text>
  </>
);

export default Informations;
