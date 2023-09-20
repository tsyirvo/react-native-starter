import { ReactNode } from 'react';

import { Box, Text } from '$shared/ui/primitives';

type MenuCategoryProps = {
  category: string;
  children: ReactNode;
};

export const MenuCategory = ({ category, children }: MenuCategoryProps) => (
  <Box pb="global_24">
    <Text pb="global_8" variant="large">
      {category}
    </Text>

    {children}
  </Box>
);
