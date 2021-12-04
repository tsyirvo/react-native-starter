/* eslint-disable react/jsx-props-no-spreading */

import React, { FC } from 'react';

import { Flex } from '$components/shared/primitives';
import { BoxProps } from '$components/shared/primitives/Box/Box.types';

type CenteredContentProps = BoxProps;

const CenteredContent: FC<CenteredContentProps> = ({ children, ...props }) => (
  <Flex justifyContent="center" alignItems="center" {...props}>
    {children}
  </Flex>
);

export default CenteredContent;
