import { useNavigation } from '@react-navigation/native';

import type { DesignSystemScreenNavigationProp } from '$features/sandbox/navigation/DebugStack.types';
import { Box } from '$shared/uiKit/primitives';

import { MenuCategory } from '../menu/components/MenuCategory';
import { MenuLine } from '../menu/components/MenuLine';

export function DesignSystemSandbox() {
  const navigation: DesignSystemScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Loader',
      onPress: () => {
        navigation.navigate('Loader');
      },
    },
    {
      label: 'Button',
      onPress: () => {
        navigation.navigate('Button');
      },
    },
    {
      label: 'Input',
      onPress: () => {
        navigation.navigate('Input');
      },
    },
  ];

  return (
    <Box p="spacing_24">
      <MenuCategory category="Design System">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Box>
  );
}
