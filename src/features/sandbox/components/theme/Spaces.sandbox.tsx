import { Fragment } from 'react';

import type { Spacing } from '$core/theme';
import { spacing, theme } from '$core/theme';
import { Box, Text } from '$shared/uiKit/primitives';
import { Screen } from '$shared/uiKit/Screen';

import { SandBoxItem } from '../menu/components/SandboxItem';

export const SpacesSandbox = () => {
  return (
    <Screen>
      <SandBoxItem isSingle>
        {(Object.keys(theme.spacing) as Spacing[]).map((space) => (
          <Fragment key={space}>
            <Text mb="spacing_8">{space}</Text>

            <Box
              bg="bg_focus"
              height={spacing[space]}
              mb="spacing_32"
              width="100%"
            />
          </Fragment>
        ))}
      </SandBoxItem>
    </Screen>
  );
};
