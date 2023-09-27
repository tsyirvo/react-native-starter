/* eslint-disable react/jsx-props-no-spreading */

import { Box } from '$shared/ui/primitives';
import type { BoxProps } from '$shared/ui/primitives/Box';

type CenteredContentProps = BoxProps;

export function CenteredContent({ children, ...props }: CenteredContentProps) {
  return (
    <Box alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
}
