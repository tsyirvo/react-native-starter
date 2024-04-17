import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { DummyForm as DummyFormComponent } from '$features/dummyForm';
import { Box } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

export const DummyFormScreen = () => {
  return (
    <Screen isScrollable={false}>
      <KeyboardAwareScrollView bottomOffset={50}>
        <Box px="spacing_16">
          <DummyFormComponent />
        </Box>
      </KeyboardAwareScrollView>
    </Screen>
  );
};
