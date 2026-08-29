import type { BoxProps } from '../primitives';
import { Box } from '../primitives';

type CenteredContentProps = BoxProps;

export const CenteredContent = ({
  children,
  ...props
}: CenteredContentProps) => (
  <Box align="center" justify="center" {...props}>
    {children}
  </Box>
);
