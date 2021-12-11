import { useNavigation } from '@react-navigation/core';

import { Box } from '$components/shared/primitives';
import { ThemeScreenNavigationProp } from '$sandbox/navigation/DebugStack.types';

import MenuCategory from '../menu/components/MenuCategory';
import MenuLine from '../menu/components/MenuLine';

const ThemeSandbox = () => {
  const navigation: ThemeScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Spaces',
      onPress: () => navigation.navigate('Spaces'),
    },
    {
      label: 'Colors',
      onPress: () => navigation.navigate('Colors'),
    },
    {
      label: 'Font Sizes',
      onPress: () => navigation.navigate('FontSizes'),
    },
    {
      label: 'Radiuses',
      onPress: () => navigation.navigate('Radiuses'),
    },
  ];

  return (
    <Box p="global_24">
      <MenuCategory category="Theme">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Box>
  );
};

export default ThemeSandbox;
