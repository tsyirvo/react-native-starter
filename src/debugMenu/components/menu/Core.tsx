import { useNavigation } from '@react-navigation/core';
import React from 'react';

import { MenuScreenNavigationProp } from '$debugMenu/navigation/DebugStack.types';

import MenuCategory from './components/MenuCategory';
import MenuLine from './components/MenuLine';

const Core = () => {
  const navigation: MenuScreenNavigationProp = useNavigation();

  const goToTheme = () => navigation.navigate('Theme');

  return (
    <MenuCategory category="Core">
      <MenuLine label="Theme" onPress={goToTheme} />
    </MenuCategory>
  );
};

export default Core;
