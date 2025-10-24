import { Stack as RouterStack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { useAuthContext } from '$domain/contexts';
import { Screen } from '$shared/components';
import { Button, Stack, Text } from '$shared/uiKit';

const ProfileScreen = () => {
  const { t } = useTranslation();

  const { signOut } = useAuthContext();

  const onLogout = async () => {
    await signOut();
  };

  return (
    <>
      <RouterStack.Screen
        options={{
          title: t('profileScreen.title'),
        }}
      />

      <Screen edges={['top']} px="spacing_16" testID="ProfileScreen">
        <Stack pt="spacing_8" gap="spacing_16">
          <Text variant="large" style={styles.centeredText}>
            {t('profileScreen.title')}
          </Text>

          <Button.Text testID="ProfileLogoutButton" onPress={onLogout}>
            {t('profileScreen.logout')}
          </Button.Text>
        </Stack>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});

export default ProfileScreen;
