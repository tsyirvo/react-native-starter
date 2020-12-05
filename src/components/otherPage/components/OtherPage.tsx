import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { OtherPageScreenNavigationProp } from '$routes/routes.types';
import { Flex, Title, Text, Button } from '$shared/primitives';
import SafeView from '$shared/SafeView';

type Props = {
  navigation: OtherPageScreenNavigationProp;
};

const OtherPage = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const goBack = useCallback(() => navigation.goBack(), []);

  return (
    <SafeView>
      <Flex justifyContent="center" alignItems="center">
        <Title fontWeight={600} testID="otherPage_title" variant="large">
          {t('otherPage.page_title')}
        </Title>

        <Button
          alignItems="center"
          mt="medium"
          testID="back_button"
          onPress={goBack}
        >
          <Text>{t('otherPage.navigation_back')}</Text>
        </Button>
      </Flex>
    </SafeView>
  );
};

export default OtherPage;
