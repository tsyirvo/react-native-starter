import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import i18n from '$i18n/config';

import * as Pages from './pages';
import { RootStackParamList } from './routes.types';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: true }}
    >
      <Stack.Screen
        name="Home"
        component={Pages.Home}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="OtherPage"
        component={Pages.OtherPage}
        options={{ title: i18n.t('otherPage.page_name') }}
        initialParams={{ someProps: 'Some value' }}
      />
      {/* inject screens before this */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootStack;
