import React, { ReactElement, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FallbackLoader from '@shared/FallbackLoader';

import { Home, Details } from './pages';
import { RootStackParamList } from './routes.types';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = (): ReactElement => (
  <NavigationContainer>
    <Suspense fallback={<FallbackLoader />}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My app', headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          initialParams={{ someProps: 'Some value' }}
        />
      </Stack.Navigator>
    </Suspense>
  </NavigationContainer>
);

export default RootStack;
