import { Fragment } from 'react';
import { ScrollView } from 'react-native';

import { Box, Text } from '$components/ui/primitives';
import spacing, { Spacing } from '$styles/spacing';
import { theme } from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const SpacesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
      {(Object.keys(theme.spacing) as Spacing[]).map((space) => (
        <Fragment key={space}>
          <Text mb="global_8">{space}</Text>

          <Box bg="grey" height={spacing[space]} mb="global_32" width="100%" />
        </Fragment>
      ))}
    </SandBoxItem>
  </ScrollView>
);

export default SpacesSandbox;
