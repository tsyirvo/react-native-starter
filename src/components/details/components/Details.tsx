import React, { useCallback, ReactElement } from 'react';

import { DetailsScreenNavigationProp } from '@routes/routes.types';
import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import { Flex, Title, Text } from '@shared/primitives';
import SafeView from '@shared/SafeView';

interface IProps {
  navigation: DetailsScreenNavigationProp;
}

const Details = ({ navigation }: IProps): ReactElement => {
  const goBack = useCallback(() => navigation.goBack(), []);

  return (
    <SafeView>
      <Flex flex={1} justifyContent="center" alignItems="center">
        <Title testID="details_title" variant="xLarge">
          {getTranslations('details', 'page_title')}
        </Title>

        <Button testID="back_button" onPress={goBack}>
          <Text mt="medium">
            {getTranslations('details', 'navigation_back')}
          </Text>
        </Button>
      </Flex>
    </SafeView>
  );
};

export default Details;
