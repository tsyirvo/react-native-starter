import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as screens from './screens';
import type { DebugStackParamList } from './types/debugStackTypes';

const Stack = createNativeStackNavigator<DebugStackParamList>();

const DebugStack = () => {
  return (
    <NavigationContainer>
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

        <Stack.Screen component={screens.SpacesSandbox} name="Spaces" />

        <Stack.Screen component={screens.ColorsSandbox} name="Colors" />

        <Stack.Screen component={screens.FontSizesSandbox} name="FontSizes" />

        <Stack.Screen component={screens.RadiusesSandbox} name="Radiuses" />

        {/* ***** ***** Components ***** ***** */}

        {/* Primitives */}

        <Stack.Screen component={screens.PrimitivesSandbox} name="Primitives" />

        <Stack.Screen component={screens.BoxSandbox} name="Box" />

        <Stack.Screen component={screens.TextSandbox} name="Text" />

        <Stack.Screen component={screens.ButtonSandbox} name="Button" />

        <Stack.Screen component={screens.InputSandbox} name="Input" />

        {/* Design System */}

        <Stack.Screen
          component={screens.DesignSystemSandbox}
          name="DesignSystem"
        />

        <Stack.Screen component={screens.LoaderSandbox} name="Loader" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DebugStack;
