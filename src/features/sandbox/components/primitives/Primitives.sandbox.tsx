import { useNavigation } from '@react-navigation/native';

import type { PrimitivesScreenNavigationProp } from '$features/sandbox/navigation/types/debugStackTypes.ts';
import { Box } from '$shared/uiKit/primitives';

import { MenuCategory } from '../menu/components/MenuCategory';
import { MenuLine } from '../menu/components/MenuLine';

export const PrimitivesSandbox = () => {
  const navigation: PrimitivesScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Box',
      onPress: () => {
        navigation.navigate('Box');
      },
    },
    {
      label: 'Text',
      onPress: () => {
        navigation.navigate('Text');
      },
    },
  ];

  return (
    <Box p="spacing_24">
      <MenuCategory category="Primitives">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Box>
  );
};
