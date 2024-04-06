import { useNavigation } from '@react-navigation/native';

import type { MenuScreenNavigationProp } from '$features/sandbox/navigation/types/debugStackTypes.ts';

import { MenuCategory } from './MenuCategory';
import { MenuLine } from './MenuLine';

export const Components = () => {
  const navigation: MenuScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Primitives',
      onPress: () => {
        navigation.navigate('Primitives');
      },
    },
    {
      label: 'Design System',
      onPress: () => {
        navigation.navigate('DesignSystem');
      },
    },
  ];

  return (
    <MenuCategory category="Components">
      {menuItems.map(({ label, onPress }) => (
        <MenuLine key={label} label={label} onPress={onPress} />
      ))}
    </MenuCategory>
  );
};
