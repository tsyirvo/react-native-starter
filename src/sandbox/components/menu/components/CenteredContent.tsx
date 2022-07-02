/* eslint-disable react/jsx-props-no-spreading */

import { FC } from 'react';

import { Box } from '$components/ui/primitives';
import { BoxProps } from '$components/ui/primitives/box/Box';

type CenteredContentProps = BoxProps;

const CenteredContent: FC<CenteredContentProps> = ({ children, ...props }) => (
  <Box alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>
);

export default CenteredContent;
