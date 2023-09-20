import { useNavigation } from '@react-navigation/native';

import { DesignSystemScreenNavigationProp } from '$features/sandbox/navigation/DebugStack.types';
import { Box } from '$shared/ui/primitives';

import { MenuCategory } from '../menu/components/MenuCategory';
import { MenuLine } from '../menu/components/MenuLine';

export const DesignSystemSandbox = () => {
  const navigation: DesignSystemScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Fallback Loader',
      onPress: () => navigation.navigate('FallbackLoader'),
    },
  ];

  return (
    <Box p="global_24">
      <MenuCategory category="Design System">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Box>
  );
};
