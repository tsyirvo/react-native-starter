import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useAppStateTracking } from './hooks/useAppStateTracking';
import { useNavigationState } from './hooks/useNavigationState';
import { screens } from './screens';
import type { RootStackParamList } from './types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { t } = useTranslation('otherScreen');

  const { navigationRef, onNavigationReady, onStateChange } =
    useNavigationState();

  useAppStateTracking();

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
          options={{ title: t('blogPost.screenTitle', { ns: 'miscScreens' }) }}
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
