import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { DummyForm as DummyFormComponent } from '$features/dummyForm';
import { Screen } from '$shared/uiKit/Screen';

const DummyFormScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen
        options={{
          title: t('miscScreens.dummyForm.screenTitle'),
        }}
      />

      <Screen isScrollable={false}>
        <KeyboardAwareScrollView bottomOffset={50}>
          <DummyFormComponent />
        </KeyboardAwareScrollView>
      </Screen>
    </>
  );
};

export default DummyFormScreen;
