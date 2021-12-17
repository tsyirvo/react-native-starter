import { useNavigation } from '@react-navigation/core';

import { MenuScreenNavigationProp } from '$sandbox/navigation/DebugStack.types';

import MenuCategory from './components/MenuCategory';
import MenuLine from './components/MenuLine';

const Core = () => {
  const navigation: MenuScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Theme',
      onPress: () => navigation.navigate('Theme'),
    },
  ];

  return (
    <MenuCategory category="Core">
      {menuItems.map(({ label, onPress }) => (
        <MenuLine key={label} label={label} onPress={onPress} />
      ))}
    </MenuCategory>
  );
};

export default Core;
