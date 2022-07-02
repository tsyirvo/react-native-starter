import { FC } from 'react';

import { Box, Text } from '$components/ui/primitives';

type MenuCategoryProps = {
  category: string;
};

const MenuCategory: FC<MenuCategoryProps> = ({ category, children }) => (
  <Box pb="global_24">
    <Text pb="global_8" variant="large">
      {category}
    </Text>

    {children}
  </Box>
);

export default MenuCategory;
