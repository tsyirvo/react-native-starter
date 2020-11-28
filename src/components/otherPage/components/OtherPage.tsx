import React, { useCallback, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { OtherPageScreenNavigationProp } from '$routes/routes.types';
import Button from '$shared/Button';
import { Flex, Title, Text } from '$shared/primitives';
import SafeView from '$shared/SafeView';

type Props = {
  navigation: OtherPageScreenNavigationProp;
};

const OtherPage = ({ navigation }: Props): ReactElement => {
  const { t } = useTranslation();

  const goBack = useCallback(() => navigation.goBack(), []);

  return (
    <SafeView>
      <Flex justifyContent="center" alignItems="center">
        <Title fontWeight={600} testID="otherPage_title" variant="large">
          {t('otherPage.page_title')}
        </Title>

        <Button
          testID="back_button"
          onPress={goBack}
          bg="grey"
          py={5}
          px={15}
          alignItems="center"
          mt={20}
          borderRadius="medium"
        >
          <Text>{t('otherPage.navigation_back')}</Text>
        </Button>
      </Flex>
    </SafeView>
  );
};

export default OtherPage;
