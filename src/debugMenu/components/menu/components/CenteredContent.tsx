/* eslint-disable react/jsx-props-no-spreading */

import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Flex } from '$components/shared/primitives';
import { BoxProps } from '$components/shared/primitives/Box/Box.types';

type CenteredContentProps = BoxProps;

const CenteredContent: FC<CenteredContentProps> = ({ children, ...props }) => (
  <ScrollView>
    <Flex justifyContent="center" alignItems="center" p="medium" {...props}>
      {children}
    </Flex>
  </ScrollView>
);

export default CenteredContent;
