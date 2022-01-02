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
          name="Home"
          component={Pages.Home}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="OtherPage"
          component={Pages.OtherPage}
          options={{ title: i18n.t('otherPage.navigation.title') }}
          initialParams={{ someProps: 'Some value' }}
        />
        {/* inject screens before this */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
