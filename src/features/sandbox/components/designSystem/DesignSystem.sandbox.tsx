import { useNavigation } from '@react-navigation/native';

import type { DesignSystemScreenNavigationProp } from '$features/sandbox/navigation/types/debugStackTypes';
import { Screen } from '$shared/uiKit/Screen';

import { MenuCategory } from '../menu/components/MenuCategory';
import { MenuLine } from '../menu/components/MenuLine';

export const DesignSystemSandbox = () => {
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
    <Screen>
      <MenuCategory category="Design System">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Screen>
  );
};
