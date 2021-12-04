import { FC } from 'react';

import { Box, Text } from '$components/shared/primitives';

type MenuCategoryProps = {
  category: string;
};

const MenuCategory: FC<MenuCategoryProps> = ({ category, children }) => (
  <Box pb="large">
    <Text variant="large" pb="small">
      {category}
    </Text>

    {children}
  </Box>
);

export default MenuCategory;
