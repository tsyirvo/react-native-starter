import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Analytics } from '$core/analytics';
import { routingInstrumentation } from '$core/monitoring';

import { screens } from './screens';
import type { RootStackParamList } from './types/navigation.types';
import { convertStringToKebabCase } from './utils/navigation.utils';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const { t } = useTranslation('otherScreen');

  const onNavigationReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;

    routingInstrumentation.registerNavigationContainer(navigationRef);
  };

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;

      Analytics.trackEvent(
        `${convertStringToKebabCase(currentRouteName)}-viewed` as 'XXX-screen-viewed',
      );
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
          options={{
            ...screenOptions,
            title: t('navigation.screenTitle', { ns: 'homeScreen' }),
          }}
        />

        <Stack.Screen
          component={screens.OtherScreen}
          initialParams={{ someProps: 'Some value' }}
          name="OtherScreen"
          options={{ title: t('navigation.title') }}
        />

        <Stack.Screen
          component={screens.BlogPostScreen}
          name="BlogPostScreen"
        />

        <Stack.Screen
          component={screens.DummyFormScreen}
          name="DummyFormScreen"
          options={{ title: t('dummyForm.screenTitle', { ns: 'miscScreens' }) }}
        />

        {/* inject screens before this */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const navigatorScreenOptions: NativeStackNavigationOptions = {
  gestureEnabled: true,
};
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};
