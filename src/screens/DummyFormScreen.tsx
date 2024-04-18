import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { DummyForm as DummyFormComponent } from '$features/dummyForm';
import { Screen } from '$shared/uiKit/Screen';

export const DummyFormScreen = () => {
  return (
    <Screen isScrollable={false}>
      <KeyboardAwareScrollView bottomOffset={50}>
        <DummyFormComponent />
      </KeyboardAwareScrollView>
    </Screen>
  );
};
