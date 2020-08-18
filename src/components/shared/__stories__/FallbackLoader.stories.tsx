/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react-native';

import CenteredContent from '@shared/CenteredContent';
import FallbackLoader from '../FallbackLoader';

storiesOf('FallbackLoader', module)
  .add('With default props', () => (
    <CenteredContent>
      <FallbackLoader />
    </CenteredContent>
  ))
  .add('Without delay', () => (
    <CenteredContent>
      <FallbackLoader delay={0} />
    </CenteredContent>
  ))
  .add('With a 3 seconds delay', () => (
    <CenteredContent>
      <FallbackLoader delay={3000} />
    </CenteredContent>
  ));
