import { Fragment } from 'react';
import { ScrollView } from 'react-native';

import type { Spacing } from '$core/theme';
import { spacing, theme } from '$core/theme';
import { Box, Text } from '$shared/uiKit/primitives';

import { SandBoxItem } from '../menu/components/SandboxItem';

export function SpacesSandbox() {
  return (
    <ScrollView>
      <SandBoxItem isSingle>
        {(Object.keys(theme.spacing) as Spacing[]).map((space) => (
          <Fragment key={space}>
            <Text mb="spacing_8">{space}</Text>

            <Box
              bg="secondary_100"
              height={spacing[space]}
              mb="spacing_32"
              width="100%"
            />
          </Fragment>
        ))}
      </SandBoxItem>
    </ScrollView>
  );
}
