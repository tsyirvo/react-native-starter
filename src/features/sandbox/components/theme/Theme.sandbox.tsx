import { useNavigation } from '@react-navigation/native';

import type { ThemeScreenNavigationProp } from '$features/sandbox/navigation/DebugStack.types';
import { Box } from '$shared/uiKit/primitives';

import { MenuCategory } from '../menu/components/MenuCategory';
import { MenuLine } from '../menu/components/MenuLine';

export function ThemeSandbox() {
  const navigation: ThemeScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Spaces',
      onPress: () => {
        navigation.navigate('Spaces');
      },
    },
    {
      label: 'Colors',
      onPress: () => {
        navigation.navigate('Colors');
      },
    },
    {
      label: 'Font Sizes',
      onPress: () => {
        navigation.navigate('FontSizes');
      },
    },
    {
      label: 'Radiuses',
      onPress: () => {
        navigation.navigate('Radiuses');
      },
    },
  ];

  return (
    <Box p="spacing_24">
      <MenuCategory category="Theme">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Box>
  );
}
