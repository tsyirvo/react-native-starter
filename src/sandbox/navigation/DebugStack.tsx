import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense } from 'react';

import FallbackLoader from '$components/ui/FallbackLoader';

import { DebugStackParamList } from './DebugStack.types';
import * as Pages from './pages';

const Stack = createNativeStackNavigator<DebugStackParamList>();

const DebugStack = () => (
  <NavigationContainer>
    <Suspense fallback={<FallbackLoader />}>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          component={Pages.Menu}
          name="Menu"
          options={{ title: 'Sandbox' }}
        />

        {/* ***** ***** Core ***** ***** */}

        {/* Theme */}

        <Stack.Screen component={Pages.ThemeSandbox} name="Theme" />

        <Stack.Screen component={Pages.Spaces} name="Spaces" />

        <Stack.Screen component={Pages.Colors} name="Colors" />

        <Stack.Screen component={Pages.FontSizes} name="FontSizes" />

        <Stack.Screen component={Pages.Radiuses} name="Radiuses" />

        {/* ***** ***** Components ***** ***** */}

        {/* Primitives */}

        <Stack.Screen component={Pages.PrimitivesSandbox} name="Primitives" />

        <Stack.Screen component={Pages.Box} name="Box" />

        <Stack.Screen component={Pages.Text} name="Text" />

        <Stack.Screen component={Pages.Button} name="Button" />

        <Stack.Screen component={Pages.Input} name="Input" />

        {/* Design System */}

        <Stack.Screen
          component={Pages.DesignSystemSandbox}
          name="DesignSystem"
        />

        <Stack.Screen component={Pages.FallbackLoader} name="FallbackLoader" />
      </Stack.Navigator>
    </Suspense>
  </NavigationContainer>
);

export default DebugStack;
