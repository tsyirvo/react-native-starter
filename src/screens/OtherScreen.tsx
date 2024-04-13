import { useTranslation } from 'react-i18next';

import type { OtherScreenNavigationProp } from '$core/navigation/navigation.types';
import { BlogPost } from '$features/blogPost';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

type OtherScreenProps = {
  navigation: OtherScreenNavigationProp;
};

export const OtherScreen = ({ navigation }: OtherScreenProps) => {
  const { t } = useTranslation('otherScreen');

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Screen>
      <Box alignItems="center" justifyContent="center" mt="spacing_16">
        <Text testID="otherPage_title" variant="large">
          {t('navigation.title')}
        </Text>

        <Box mt="spacing_24">
          <Button.Text testID="back_button" onPress={goBack}>
            {t('navigation.backCta')}
          </Button.Text>
        </Box>

        <Box pt="spacing_24">
          <BlogPost />
        </Box>
      </Box>
    </Screen>
  );
};
