import { ReactNode } from 'react';

import { Box, Text } from '$components/ui/primitives';

import CenteredContent from './CenteredContent';
import Separator from './Separator';

type SandBoxItemProps = {
  title?: string;
  isSingle?: boolean;
  children: ReactNode;
};

const SandBoxItem = ({ title, isSingle, children }: SandBoxItemProps) => (
  <Box pt="global_8" px="global_24">
    {!!title && <Text>{title}</Text>}

    <CenteredContent py="global_24">{children}</CenteredContent>

    {!isSingle && <Separator color="grey" />}
  </Box>
);

export default SandBoxItem;
