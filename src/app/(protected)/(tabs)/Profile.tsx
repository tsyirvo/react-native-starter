import { Stack as RouterStack } from 'expo-router';
import { useTranslation } from 'react-i18next';

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
        <Stack gap="spacing_16" pt="spacing_8">
          <Text textAlign="center" variant="large">
            {t('profileScreen.title')}
          </Text>

          <Button.Text onPress={onLogout} testID="ProfileLogoutButton">
            {t('profileScreen.logout')}
          </Button.Text>
        </Stack>
      </Screen>
    </>
  );
};

export default ProfileScreen;
