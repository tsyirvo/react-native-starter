import { useNavigation } from '@react-navigation/native';

import type { MenuScreenNavigationProp } from '$features/sandbox/navigation/types/debugStackTypes';

import { MenuCategory } from './MenuCategory';
import { MenuLine } from './MenuLine';

export const Core = () => {
  const navigation: MenuScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Theme',
      onPress: () => {
        navigation.navigate('Theme');
      },
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
