/* eslint-disable react/jsx-props-no-spreading */

import type { BoxProps } from '../primitives';
import { Box } from '../primitives';

type CenteredContentProps = BoxProps;

export const CenteredContent = ({
  children,
  ...props
}: CenteredContentProps) => {
  return (
    <Box align="center" justify="center" {...props}>
      {children}
    </Box>
  );
};
