import React, { ReactElement, ReactNode } from 'react';

import { Flex } from '@shared/primitives';
import { BoxProps } from '@shared/primitives/Box/Box.types';

type Props = BoxProps & {
  children: ReactNode;
};

const CenteredContent = ({ children, ...props }: Props): ReactElement => (
  <Flex justifyContent="center" alignItems="center" {...props}>
    {children}
  </Flex>
);

export default CenteredContent;
