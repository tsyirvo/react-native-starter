import React, { Fragment } from 'react';

import { Box, Text } from '$components/shared/primitives';
import theme from '$styles/theme';

import CenteredContent from '../menu/components/CenteredContent';

const SpacesDebugPage = () => (
  <CenteredContent>
    {(Object.keys(theme.space) as (keyof typeof theme.space)[]).map((space) => (
      <Fragment key={space}>
        <Text>{`${space} - ${theme.space[space]}px`}</Text>
        <Box width="100%" height={theme.space[space]} bg="grey" mb="large" />
      </Fragment>
    ))}
  </CenteredContent>
);

export default SpacesDebugPage;
