import { ScrollView } from 'react-native';

import { Input } from '$components/ui/primitives';

import SandBoxItem from '../menu/components/SandboxItem';

const InputSandbox = () => (
  <ScrollView>
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
  </ScrollView>
);

export default InputSandbox;
