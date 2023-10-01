import type { ReactNode } from 'react';

import { Box, Text } from '$shared/uiKit/primitives';

type MenuCategoryProps = {
  category: string;
  children: ReactNode;
};

export function MenuCategory({ category, children }: MenuCategoryProps) {
  return (
    <Box pb="spacing_24">
      <Text pb="spacing_8" variant="large">
        {category}
      </Text>

      {children}
    </Box>
  );
}
