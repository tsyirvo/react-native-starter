import type { ReactNode } from 'react';

import { Box, Text } from '$shared/uiKit/primitives';

import { CenteredContent } from './CenteredContent';
import { Separator } from './Separator';

type SandBoxItemProps = {
  title?: string;
  isSingle?: boolean;
  children: ReactNode;
};

export const SandBoxItem = ({
  title,
  isSingle,
  children,
}: SandBoxItemProps) => {
  return (
    <Box pt="spacing_8" px="spacing_8">
      {!!title && <Text>{title}</Text>}

      <CenteredContent py="spacing_24">{children}</CenteredContent>

      {!isSingle && <Separator color="bg_focus" />}
    </Box>
  );
};
