import { ScrollView } from 'react-native';

import { Input } from '$components/shared/primitives';

import SandBoxItem from '../menu/components/SandboxItem';

const InputSandbox = () => (
  <ScrollView>
    <SandBoxItem title="Input with a label">
      <Input label="Some label" placeholder="Type here" />
    </SandBoxItem>

    <SandBoxItem title="Input with an error">
      <Input label="Some label" placeholder="Type here" error="An error" />
    </SandBoxItem>

    <SandBoxItem title="Input without label">
      <Input value="Some value" />
    </SandBoxItem>

    <SandBoxItem title="Input not editable">
      <Input label="Some label" placeholder="Type here" editable={false} />
    </SandBoxItem>
  </ScrollView>
);

export default InputSandbox;
