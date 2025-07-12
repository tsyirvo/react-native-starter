import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import logoDark from '$assets/images/logo-dark.png';
import { useAuthContext } from '$domain/contexts';
import { UserLogin } from '$domain/entities';
import { makeAppStyles } from '$domain/theme';
import { LoginForm } from '$features/loginForm';
import { Screen } from '$shared/components';
import { Box, Image, Text } from '$shared/uiKit';

const Login = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { signIn } = useAuthContext();

  const styles = useStyles();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onFormSuccess = async (data: UserLogin) => {
    await signIn(data);

    router.replace('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          title: t('loginScreen.title'),
          animation: 'fade',
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
