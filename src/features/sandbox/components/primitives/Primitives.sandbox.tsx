import { useNavigation } from '@react-navigation/native';

import type { PrimitivesScreenNavigationProp } from '$features/sandbox/navigation/types/debugStackTypes';
import { Screen } from '$shared/uiKit/Screen';

import { MenuCategory } from '../menu/components/MenuCategory';
import { MenuLine } from '../menu/components/MenuLine';

export const PrimitivesSandbox = () => {
  const navigation: PrimitivesScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Box',
      onPress: () => {
        navigation.navigate('Box');
      },
    },
    {
      label: 'Text',
      onPress: () => {
        navigation.navigate('Text');
      },
    },
  ];

  return (
    <Screen>
      <MenuCategory category="Primitives">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Screen>
  );
};
