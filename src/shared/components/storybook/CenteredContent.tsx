/* eslint-disable react/jsx-props-no-spreading */

import { Box, type BoxProps } from '$shared/uiKit';

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
