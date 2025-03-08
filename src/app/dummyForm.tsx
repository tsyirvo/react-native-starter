import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { DummyForm as DummyFormComponent } from '$features/dummyForm';
import { Box, Screen } from '$shared/uiKit';

const DummyFormScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('miscScreens.dummyForm.screenTitle'),
        }}
      />

      <Screen>
        <KeyboardAwareScrollView bottomOffset={50}>
          <Box px="spacing_16" py="spacing_8">
            <DummyFormComponent />
          </Box>
        </KeyboardAwareScrollView>
      </Screen>
    </>
  );
};

export default DummyFormScreen;
