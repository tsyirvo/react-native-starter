import { useTranslation } from 'react-i18next';

import type { OtherScreenNavigationProp } from '$core/navigation/types/navigation.types';
import { Notifications } from '$features/notifications';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

type OtherScreenProps = {
  navigation: OtherScreenNavigationProp;
};

export const OtherScreen = ({ navigation }: OtherScreenProps) => {
  const { t } = useTranslation('otherScreen');

  const goToBlogPost = () => {
    navigation.navigate('BlogPostScreen');
  };

  const goToDummyForm = () => {
    navigation.navigate('DummyFormScreen');
  };

  return (
    <Screen>
      <Box borderBottomColor="bg_focus" borderBottomWidth={1} pb="spacing_16">
        <Text testID="apiExample_title" variant="large">
          {t('graphql.title')}
        </Text>

        <Box alignItems="flex-start" mt="spacing_8">
          <Button.Text
            testID="apiExample_navigate_button"
            onPress={goToBlogPost}
          >
            {t('graphql.cta')}
          </Button.Text>
        </Box>
      </Box>

      <Box borderBottomColor="bg_focus" borderBottomWidth={1} py="spacing_16">
        <Text variant="large">{t('form.title')}</Text>

        <Box alignItems="flex-start" mt="spacing_8">
          <Button.Text onPress={goToDummyForm}>{t('form.cta')}</Button.Text>
        </Box>
      </Box>

      <Box borderBottomColor="bg_focus" borderBottomWidth={1} py="spacing_16">
        <Notifications />
      </Box>
    </Screen>
  );
};
