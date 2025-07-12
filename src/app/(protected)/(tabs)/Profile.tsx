import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '$domain/contexts';
import { Screen } from '$shared/components';
import { Box, Button, Text } from '$shared/uiKit';

const ProfileScreen = () => {
  const { t } = useTranslation();

  const { signOut } = useAuthContext();

  const onLogout = async () => {
    await signOut();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('profileScreen.title'),
        }}
      />

      <Screen edges={['top']} px="spacing_16" testID="ProfileScreen">
        <Box pt="spacing_8" gap="spacing_16">
          <Text variant="large" textAlign="center">
            {t('profileScreen.title')}
          </Text>

          <Button.Text testID="ProfileLogoutButton" onPress={onLogout}>
            {t('profileScreen.logout')}
          </Button.Text>
        </Box>
      </Screen>
    </>
  );
};

export default ProfileScreen;
