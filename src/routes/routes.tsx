import React, { ReactElement, Suspense, useRef, useCallback } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { useTranslation } from 'react-i18next';

import FallbackLoader from '$shared/FallbackLoader';

import * as Pages from './pages';
import { RootStackParamList } from './routes.types';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = (): ReactElement => {
  const { t } = useTranslation();

  const routeNameRef = useRef<string>();
  const navigationRef = useRef<NavigationContainerRef>(null);

  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
  }, []);

  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName =
      navigationRef?.current?.getCurrentRoute()?.name || '';

    if (previousRouteName !== currentRouteName) {
      analytics().logScreenView({ screen_name: currentRouteName });
      crashlytics().setAttribute('currentScreen', currentRouteName);
    }

    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}
    >
      <Suspense fallback={<FallbackLoader />}>
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
            options={{ title: t('otherPage.page_name') }}
            initialParams={{ someProps: 'Some value' }}
          />
          {/* inject screens before this */}
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};

export default RootStack;
