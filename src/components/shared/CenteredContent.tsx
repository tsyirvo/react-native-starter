import React, { ReactElement } from 'react';

import { Flex } from '$shared/primitives';
import { BoxProps } from '$shared/primitives/Box/Box.types';

type Props = BoxProps & {
  children: ReactElement | ReactElement[];
};

const CenteredContent = ({ children, ...props }: Props) => (
  <Flex justifyContent="center" alignItems="center" {...props}>
    {children}
  </Flex>
);

export default CenteredContent;
