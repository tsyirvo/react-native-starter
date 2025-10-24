import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Notifications } from '$features/notifications';
import { StoreUpdateAvailableBanner, Screen } from '$shared/components';
import { useIsNewStoreVersionAvailable } from '$shared/hooks';
import { Box, Button, Text } from '$shared/uiKit';

const FeaturesScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { shouldShowBanner } = useIsNewStoreVersionAvailable();

  const goToBlogPost = () => {
    router.push('/features/(blogPost)/1');
  };

  return (
    <>
      <Stack.Screen options={{ title: t('tabs.features') }} />

      <Screen edges={['top']} testID="otherScreen-screen">
        <ScrollView>
          <Box px="spacing_16" py="spacing_8">
            {shouldShowBanner ? (
              <Box pb="spacing_16">
                <StoreUpdateAvailableBanner />
              </Box>
            ) : null}

            <View style={styles.section}>
              <Text variant="large">{t('featuresScreen.blogPost.title')}</Text>

              <Box self="flex-start" mt="spacing_8">
                <Button.Text onPress={goToBlogPost}>
                  {t('featuresScreen.blogPost.cta')}
                </Button.Text>
              </Box>
            </View>

            <View style={styles.sectionWithTopPadding}>
              <Notifications />
            </View>
          </Box>
        </ScrollView>
      </Screen>
    </>
  );
};

export default FeaturesScreen;

const styles = StyleSheet.create((theme) => ({
  section: {
    borderBottomColor: theme.colors.bg_muted,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.spacing_16,
  },
  sectionWithTopPadding: {
    borderBottomColor: theme.colors.bg_muted,
    borderBottomWidth: 1,
    paddingVertical: theme.spacing.spacing_16,
  },
}));
