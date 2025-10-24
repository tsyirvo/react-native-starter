import { Stack as RouterStack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';

import logoDark from '$assets/images/logo-dark.png';
import { useAuthContext } from '$domain/contexts';
import { UserLogin } from '$domain/entities';
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
          headerShown: false,
          title: t('loginScreen.title'),
          animation: 'fade',
        }}
      />

      <Screen edges={['top']} px="spacing_16">
        <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <Box flex={1} pt="spacing_32" gap="spacing_16">
              <Stack align="center">
                <Image source={logoDark} style={styles.logo} />
              </Stack>

              <Stack
                p="spacing_16"
                gap="spacing_24"
                style={styles.formContainer}
              >
                <Text variant="large" textAlign="center">
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
  wrapper: {
    flex: 1,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  formContainer: {
    backgroundColor: theme.colors.bg_muted,
    borderRadius: theme.borderRadii.radius_24,
  },
}));

export default Login;
