import { FC } from 'react';

import { Box, Text } from '$components/shared/primitives';

import CenteredContent from './CenteredContent';
import Separator from './Separator';

type SandBoxItemProps = {
  title?: string;
  isSingle?: boolean;
};

const SandBoxItem: FC<SandBoxItemProps> = ({ title, isSingle, children }) => (
  <Box px="global_24" pt="global_8">
    {!!title && <Text>{title}</Text>}

    <CenteredContent py="global_24">{children}</CenteredContent>

    {!isSingle && <Separator color="grey" />}
  </Box>
);

export default SandBoxItem;
