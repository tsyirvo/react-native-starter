import React, { FC } from 'react';

import { Flex, Text } from '$components/shared/primitives';

import CenteredContent from './CenteredContent';
import Separator from './Separator';

type SandBoxItemProps = {
  title?: string;
  isSingle?: boolean;
};

const SandBoxItem: FC<SandBoxItemProps> = ({ title, isSingle, children }) => (
  <Flex px="medium" pt="small">
    {!!title && <Text>{title}</Text>}

    <CenteredContent py="medium">{children}</CenteredContent>

    {!isSingle && <Separator color="grey" />}
  </Flex>
);

export default SandBoxItem;
