import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import FallbackLoader from '$shared/FallbackLoader';

import * as Pages from './pages';
import { RootStackParamList } from './routes.types';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
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
