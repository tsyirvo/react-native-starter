import type { ReactNode } from 'react';

import { CenteredContent } from '$shared/uiKit/layout';
import { Stack, Text } from '$shared/uiKit/primitives';
import { Separator } from '$shared/uiKit/separator';

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
