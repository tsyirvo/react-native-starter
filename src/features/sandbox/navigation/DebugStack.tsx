import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense } from 'react';

import { FallbackLoader } from '$shared/ui/FallbackLoader';

import { DebugStackParamList } from './DebugStack.types';
import * as screens from './screens';

const Stack = createNativeStackNavigator<DebugStackParamList>();

export const DebugStack = () => (
  <NavigationContainer>
    <Suspense fallback={<FallbackLoader />}>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          component={screens.Menu}
          name="Menu"
          options={{ title: 'Sandbox' }}
        />

        {/* ***** ***** Core ***** ***** */}

        {/* Theme */}

        <Stack.Screen component={screens.ThemeSandbox} name="Theme" />

        <Stack.Screen component={screens.Spaces} name="Spaces" />

        <Stack.Screen component={screens.Colors} name="Colors" />

        <Stack.Screen component={screens.FontSizes} name="FontSizes" />

        <Stack.Screen component={screens.Radiuses} name="Radiuses" />

        {/* ***** ***** Components ***** ***** */}

        {/* Primitives */}

        <Stack.Screen component={screens.PrimitivesSandbox} name="Primitives" />

        <Stack.Screen component={screens.Box} name="Box" />

        <Stack.Screen component={screens.Text} name="Text" />

        <Stack.Screen component={screens.Button} name="Button" />

        <Stack.Screen component={screens.Input} name="Input" />

        {/* Design System */}

        <Stack.Screen
          component={screens.DesignSystemSandbox}
          name="DesignSystem"
        />

        <Stack.Screen
          component={screens.FallbackLoader}
          name="FallbackLoader"
        />
      </Stack.Navigator>
    </Suspense>
  </NavigationContainer>
);
