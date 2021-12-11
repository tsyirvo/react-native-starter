/* eslint-disable react/jsx-props-no-spreading */

import { FC } from 'react';

import { Box } from '$components/shared/primitives';
import { BoxProps } from '$components/shared/primitives/box/Box';

type CenteredContentProps = BoxProps;

const CenteredContent: FC<CenteredContentProps> = ({ children, ...props }) => (
  <Box justifyContent="center" alignItems="center" {...props}>
    {children}
  </Box>
);

export default CenteredContent;
