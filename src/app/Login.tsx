import { Stack as RouterStack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';

import logoDark from '$assets/images/logo-dark.png';
import { useAuthContext } from '$domain/contexts';
import type { UserLogin } from '$domain/entities';
import { LoginForm } from '$features/loginForm';
import { Screen } from '$shared/components';
import { Box, Image, Stack, Text } from '$shared/uiKit';

const Login = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { signIn } = useAuthContext();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onFormSuccess = async (data: UserLogin) => {
    await signIn(data);

    router.replace('/');
  };

  return (
    <>
      <RouterStack.Screen
        options={{
          animation: 'fade',
          headerShown: false,
          title: t('loginScreen.title'),
        }}
      />

      <Screen edges={['top']} px="spacing_16">
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <Box flex={1} gap="spacing_16" pt="spacing_32">
              <Stack align="center">
                <Image source={logoDark} style={styles.logo} />
              </Stack>

              <Stack
                gap="spacing_24"
                p="spacing_16"
                style={styles.formContainer}
              >
                <Text textAlign="center" variant="large">
                  {t('loginScreen.title')}
                </Text>

                <LoginForm onFormSuccess={onFormSuccess} />
              </Stack>
            </Box>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

const LOGO_SIZE = 150;

const styles = StyleSheet.create((theme) => ({
  formContainer: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_24,
  },
  logo: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
  },
  wrapper: {
    flex: 1,
  },
}));

export default Login;
