import React, { useCallback, ReactElement } from 'react';

import { OtherPageScreenNavigationProp } from '@routes/routes.types';
import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import { Flex, Title, Text } from '@shared/primitives';
import SafeView from '@shared/SafeView';

interface IProps {
  navigation: OtherPageScreenNavigationProp;
}

const OtherPage = ({ navigation }: IProps): ReactElement => {
  const goBack = useCallback(() => navigation.goBack(), []);

  return (
    <SafeView>
      <Flex justifyContent="center" alignItems="center">
        <Title fontWeight={600} testID="otherPage_title" variant="large">
          {getTranslations('otherPage', 'page_title')}
        </Title>

        <Button testID="back_button" onPress={goBack}>
          <Text mt="medium">
            {getTranslations('otherPage', 'navigation_back')}
          </Text>
        </Button>
      </Flex>
    </SafeView>
  );
};

export default OtherPage;
