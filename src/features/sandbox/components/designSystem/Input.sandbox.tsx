import { Input } from '$shared/uiKit/input';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const InputSandbox = () => {
  return (
    <Screen>
      <SandBoxItem title="Input with a label">
        <Input label="Some label" placeholder="Type here" />
      </SandBoxItem>

      <SandBoxItem title="Input with an error">
        <Input error="An error" label="Some label" placeholder="Type here" />
      </SandBoxItem>

      <SandBoxItem title="Input without label">
        <Input value="Some value" />
      </SandBoxItem>

      <SandBoxItem title="Input not editable">
        <Input editable={false} label="Some label" placeholder="Type here" />
      </SandBoxItem>
    </Screen>
  );
};
