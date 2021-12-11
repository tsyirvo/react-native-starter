import { useNavigation } from '@react-navigation/core';

import { Box } from '$components/shared/primitives';
import { PrimitivesScreenNavigationProp } from '$sandbox/navigation/DebugStack.types';

import MenuCategory from '../menu/components/MenuCategory';
import MenuLine from '../menu/components/MenuLine';

const PrimitivesSandbox = () => {
  const navigation: PrimitivesScreenNavigationProp = useNavigation();

  const menuItems = [
    {
      label: 'Box',
      onPress: () => navigation.navigate('Box'),
    },
    {
      label: 'Text',
      onPress: () => navigation.navigate('Text'),
    },
    {
      label: 'Button',
      onPress: () => navigation.navigate('Button'),
    },
    {
      label: 'Input',
      onPress: () => navigation.navigate('Input'),
    },
  ];

  return (
    <Box p="global_24">
      <MenuCategory category="Primitives">
        {menuItems.map(({ label, onPress }) => (
          <MenuLine key={label} label={label} onPress={onPress} />
        ))}
      </MenuCategory>
    </Box>
  );
};

export default PrimitivesSandbox;
