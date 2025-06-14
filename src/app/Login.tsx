import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import logoDark from '$assets/images/logo-dark.png';
import { makeAppStyles } from '$domain/theme';
import { LoginForm } from '$features/loginForm';
import { useAppStore } from '$infra/store';
import { Box, Image, Screen, Text } from '$shared/uiKit';

const Login = () => {
  const setIsUserLoggedIn = useAppStore((state) => state.setIsUserLoggedIn);

  const router = useRouter();
  const { t } = useTranslation();

  const styles = useStyles();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onFormSuccess = () => {
    setIsUserLoggedIn(true);

    router.replace('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: t('loginScreen.title'),
        }}
      />

      <Screen edges={['top']} px="spacing_16">
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <Box flex={1} pt="spacing_32" gap="spacing_16">
              <Box alignItems="center">
                <Image source={logoDark} style={styles.logo} />
              </Box>

              <Box
                bg="bg_muted"
                p="spacing_16"
                borderRadius="radius_24"
                gap="spacing_24"
              >
                <Text variant="large" textAlign="center">
                  {t('loginScreen.title')}
                </Text>

                <LoginForm onFormSuccess={onFormSuccess} />
              </Box>
            </Box>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

const LOGO_SIZE = 150;

const useStyles = makeAppStyles(() => ({
  wrapper: {
    flex: 1,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
}));

export default Login;
