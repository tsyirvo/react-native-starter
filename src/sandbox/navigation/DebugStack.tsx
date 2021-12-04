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
        <Stack.Screen
          name="Menu"
          component={Pages.Menu}
          options={{ title: 'Sandbox' }}
        />

        {/* ***** ***** Core ***** ***** */}

        {/* Theme */}
        <Stack.Screen name="Theme" component={Pages.ThemeSandbox} />
        <Stack.Screen name="Spaces" component={Pages.Spaces} />
        <Stack.Screen name="Colors" component={Pages.Colors} />
        <Stack.Screen name="FontSizes" component={Pages.FontSizes} />
        <Stack.Screen name="Radiuses" component={Pages.Radiuses} />

        {/* ***** ***** Components ***** ***** */}

        {/* Primitives */}
        <Stack.Screen name="Primitives" component={Pages.PrimitivesSandbox} />
        <Stack.Screen name="Box" component={Pages.Box} />
        <Stack.Screen name="Text" component={Pages.Text} />
        <Stack.Screen name="Button" component={Pages.Button} />
        <Stack.Screen name="Input" component={Pages.Input} />

        {/* Design System */}
        <Stack.Screen
          name="DesignSystem"
          component={Pages.DesignSystemSandbox}
        />
        <Stack.Screen name="FallbackLoader" component={Pages.FallbackLoader} />
      </Stack.Navigator>
    </Suspense>
  </NavigationContainer>
);

export default DebugStack;
