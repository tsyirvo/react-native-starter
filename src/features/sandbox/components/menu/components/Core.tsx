import { useNavigation } from '@react-navigation/native';

import type { MenuScreenNavigationProp } from '$features/sandbox/navigation/DebugStack.types';

import { MenuCategory } from './MenuCategory';
import { MenuLine } from './MenuLine';

export function Core() {
  const navigation: MenuScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Theme',
      onPress: () => { navigation.navigate('Theme'); },
    },
  ];

  return (
    <MenuCategory category="Core">
      {menuItems.map(({ label, onPress }) => (
        <MenuLine key={label} label={label} onPress={onPress} />
      ))}
    </MenuCategory>
  );
}
