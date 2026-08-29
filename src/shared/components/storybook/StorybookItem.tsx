import type { ReactNode } from 'react';

import { Separator, Stack, Text } from '$shared/uiKit';
import { CenteredContent } from '$shared/uiKit/layout';

interface StorybookItemProps {
  children: ReactNode;
  isSingle?: boolean;
  title?: string;
}

export const StorybookItem = ({
  title,
  isSingle,
  children,
}: StorybookItemProps) => (
  <Stack pt="spacing_8" px="spacing_8">
    {!!title && <Text>{title}</Text>}

    <CenteredContent py="spacing_24">{children}</CenteredContent>

    {!isSingle && <Separator color="bg_muted" />}
  </Stack>
);
