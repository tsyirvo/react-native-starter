import { Fragment } from 'react';
import { ScrollView } from 'react-native';

import type { Spacing } from '$core/theme';
import { spacing, theme } from '$core/theme';
import { Box, Text } from '$shared/ui/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function SpacesSandbox() {
  return (
    <ScrollView>
      <SandBoxItem isSingle>
        {(Object.keys(theme.spacing) as Spacing[]).map((space) => (
          <Fragment key={space}>
            <Text mb="global_8">{space}</Text>

            <Box
              bg="grey"
              height={spacing[space]}
              mb="global_32"
              width="100%"
            />
          </Fragment>
        ))}
      </SandBoxItem>
    </ScrollView>
  );
}
