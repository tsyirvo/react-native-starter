import { Screen } from '$shared/uiKit/Screen';

import { Components } from './components/Components';
import { Core } from './components/Core';
import { Flows } from './components/Flows';

export const Menu = () => {
  return (
    <Screen>
      <Core />

      <Components />

      <Flows />
    </Screen>
  );
};
