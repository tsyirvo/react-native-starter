/* eslint-disable react/jsx-props-no-spreading */

import { Box } from '$shared/uiKit/primitives';
import type { BoxProps } from '$shared/uiKit/primitives/Box';

type CenteredContentProps = BoxProps;

export const CenteredContent = ({
  children,
  ...props
}: CenteredContentProps) => {
  return (
    <Box alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
};
