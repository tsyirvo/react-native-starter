import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Suspense } from 'react';

import FallbackLoader from '$components/shared/FallbackLoader';

import { DebugStackParamList } from './DebugStack.types';
import * as Pages from './pages';

const Stack = createStackNavigator<DebugStackParamList>();

const DebugStack = () => (
  <NavigationContainer>
    <Suspense fallback={<FallbackLoader />}>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen name="Menu" component={Pages.Menu} />

        {/* Core */}
        <Stack.Screen name="Theme" component={Pages.ThemeSandbox} />
        <Stack.Screen name="Spaces" component={Pages.Spaces} />
        <Stack.Screen name="Colors" component={Pages.Colors} />
        <Stack.Screen name="FontSizes" component={Pages.FontSizes} />
        <Stack.Screen name="Radiuses" component={Pages.Radiuses} />
      </Stack.Navigator>
    </Suspense>
  </NavigationContainer>
);

export default DebugStack;
