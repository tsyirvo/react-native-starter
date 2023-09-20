/* eslint-disable react/jsx-props-no-spreading */

import { FC } from 'react';

import { Box } from '$shared/ui/primitives';
import { BoxProps } from '$shared/ui/primitives/Box';

type CenteredContentProps = BoxProps;

export const CenteredContent: FC<CenteredContentProps> = ({
  children,
  ...props
}) => (
  <Box alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>
);
