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
import { Box, Flex, Image, Text } from '$shared/uiKit';

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
              <Flex align="center">
                <Image source={logoDark} style={styles.logo} />
              </Flex>

              <Box
                bg="bg_muted"
                p="spacing_16"
                borderRadius="radius_24"
                gap="spacing_24"
              >
                <Text variant="large" style={styles.centeredText}>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  centeredText: {
    textAlign: 'center',
  },
});

export default Login;
