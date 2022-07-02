import { useNavigationContainerRef } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { routingInstrumentation } from '$core/monitoring/errorMonitoring';
import i18n from '$i18n/config';

import { RootStackParamList } from './navigation.types';
import * as Pages from './pages';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const navigation = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigation);
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          component={Pages.Home}
          name="Home"
          options={{ title: 'Home', headerShown: false }}
        />

        <Stack.Screen
          component={Pages.OtherPage}
          initialParams={{ someProps: 'Some value' }}
          name="OtherPage"
          options={{ title: i18n.t('otherPage.navigation.title') }}
        />

        {/* inject screens before this */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
