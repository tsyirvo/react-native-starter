/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react-native';

import CenteredContent from '$shared/CenteredContent';
import { Box } from '$shared/primitives';

storiesOf('Box', module)
  .add('With a size, color and radiuses', () => (
    <CenteredContent>
      <Box size={100} bg="grey" borderRadius="medium" />
    </CenteredContent>
  ))
  .add('With border props and full width', () => (
    <CenteredContent>
      <Box
        width="100%"
        height={50}
        bg="grey"
        borderBottomColor="green"
        borderBottomWidth={4}
      />
    </CenteredContent>
  ))
  .add('With position props and odd size', () => (
    <CenteredContent>
      <Box width={100} height={50} bg="grey" top={125} left={20} mb={50} />
    </CenteredContent>
  ));
