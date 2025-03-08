import type { ReactNode } from 'react';

import { Box, Text } from '$shared/uiKit';

import { CenteredContent } from './CenteredContent';
import { Separator } from './Separator';

type StorybookItemProps = {
  title?: string;
  isSingle?: boolean;
  children: ReactNode;
};

export const StorybookItem = ({
  title,
  isSingle,
  children,
}: StorybookItemProps) => {
  return (
    <Box pt="spacing_8" px="spacing_8">
      {!!title && <Text>{title}</Text>}

      <CenteredContent py="spacing_24">{children}</CenteredContent>

      {!isSingle && <Separator color="bg_focus" />}
    </Box>
  );
};
