import { Fragment } from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/shared/primitives';
import spacing, { Spacing } from '$styles/spacing';
import { theme } from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const SpacesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.spacing) as Spacing[]).map((space) => (
        <Fragment key={space}>
          <Text mb="global_8">{space}</Text>
          <Box width="100%" height={spacing[space]} bg="grey" mb="global_32" />
        </Fragment>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default SpacesSandbox;
