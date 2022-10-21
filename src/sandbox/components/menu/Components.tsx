import { useNavigation } from '@react-navigation/native';

import { MenuScreenNavigationProp } from '$sandbox/navigation/DebugStack.types';

import MenuCategory from './components/MenuCategory';
import MenuLine from './components/MenuLine';

const Components = () => {
  const navigation: MenuScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Primitives',
      onPress: () => navigation.navigate('Primitives'),
    },
    {
      label: 'Design System',
      onPress: () => navigation.navigate('DesignSystem'),
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

export default Components;
