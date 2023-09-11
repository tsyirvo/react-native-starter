import { useFlipper } from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { routingInstrumentation } from '$core/monitoring/errorMonitoring';

import { RootStackParamList } from './navigation.types';
import * as Pages from './pages';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const navigationRef = useNavigationContainerRef();

  const { t } = useTranslation('otherScreen');

  useFlipper(navigationRef);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          component={Pages.Home}
          name="Home"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Pages.OtherPage}
          initialParams={{ someProps: 'Some value' }}
          name="OtherPage"
          options={{ title: t('navigation.title') }}
        />

        {/* inject screens before this */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
