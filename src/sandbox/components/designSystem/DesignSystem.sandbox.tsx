import { useNavigation } from '@react-navigation/core';

import { Box } from '$components/ui/primitives';
import { DesignSystemScreenNavigationProp } from '$sandbox/navigation/DebugStack.types';

import MenuCategory from '../menu/components/MenuCategory';
import MenuLine from '../menu/components/MenuLine';

const DesignSystemSandbox = () => {
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

export default DesignSystemSandbox;
