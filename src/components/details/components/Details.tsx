import React, { useCallback, ReactElement } from 'react';

import { INavigationTypes } from 'types/navigation.types';

import getTranslations from '@utils/locales';

import Button from '@shared/Button';
import Box from '@shared/Box';
import Text from '@shared/Text';
import SafeView from '@shared/SafeView';

interface IProps {
  navigation: INavigationTypes;
}

const Details = ({ navigation }: IProps): ReactElement => {
  const goBack = useCallback(() => navigation.goBack(null), []);

  return (
    <SafeView>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text testID="details_title" fontSize={4}>
          {getTranslations('details', 'page_title')}
        </Text>

        <Button testID="back_button" onPress={goBack}>
          <Text mt={3}>{getTranslations('details', 'navigation_back')}</Text>
        </Button>
      </Box>
    </SafeView>
  );
};

export default Details;
