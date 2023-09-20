import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Analytics } from '$core/Analytics';
import { routingInstrumentation } from '$core/monitoring';

import { RootStackParamList } from './navigation.types';
import { screens } from './screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigatorScreenOptions: NativeStackNavigationOptions = {
  gestureEnabled: true,
};
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const RootStack = () => {
  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const { t } = useTranslation('otherScreen');

  useFlipper(navigationRef);

  const onNavigationReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;

    routingInstrumentation.registerNavigationContainer(navigationRef);
  };

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;

      Analytics.track(`${currentRouteName}_viewed`);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onNavigationReady}
      onStateChange={onStateChange}
    >
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={navigatorScreenOptions}
      >
        <Stack.Screen
          component={screens.HomeScreen}
          name="HomeScreen"
          options={screenOptions}
        />

        <Stack.Screen
          component={screens.OtherScreen}
          initialParams={{ someProps: 'Some value' }}
          name="OtherScreen"
          options={{ title: t('navigation.title') }}
        />

        {/* inject screens before this */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
