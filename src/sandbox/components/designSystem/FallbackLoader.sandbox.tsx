import React from 'react';
import { ScrollView } from 'react-native';

import FallbackLoader from '$components/shared/FallbackLoader';
import { Text } from '$components/shared/primitives';

import CenteredContent from '../menu/components/CenteredContent';

const FallbackLoaderSandbox = () => (
  <ScrollView>
    <CenteredContent>
      <Text pb="small">FallbackLoader default props</Text>

      <FallbackLoader />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">FallbackLoader default props</Text>

      <FallbackLoader delay={0} />
    </CenteredContent>

    <CenteredContent>
      <Text pb="small">FallbackLoader default props</Text>

      <FallbackLoader delay={3000} />
    </CenteredContent>
  </ScrollView>
);

export default FallbackLoaderSandbox;
