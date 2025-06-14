import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppStore } from '$infra/store';
import { Box, Button, Screen, Text } from '$shared/uiKit';

const ProfileScreen = () => {
  const setIsUserLoggedIn = useAppStore((state) => state.setIsUserLoggedIn);

  const { t } = useTranslation();

  const onLogout = () => {
    setIsUserLoggedIn(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('profileScreen.title'),
        }}
      />

      <Screen edges={['top']} px="spacing_16">
        <Box pt="spacing_8" gap="spacing_16">
          <Text variant="large" textAlign="center">
            {t('profileScreen.title')}
          </Text>

          <Button.Text onPress={onLogout}>
            {t('profileScreen.logout')}
          </Button.Text>
        </Box>
      </Screen>
    </>
  );
};

export default ProfileScreen;
