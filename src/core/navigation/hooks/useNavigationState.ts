import { useNavigationContainerRef } from '@react-navigation/native';
import { useRef } from 'react';

import { Analytics } from '$core/analytics';
import { routingInstrumentation } from '$core/monitoring';

import { convertStringToKebabCase } from '../utils/navigation.utils';

export const useNavigationState = () => {
  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

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

  return {
    navigationRef,
    onNavigationReady,
    onStateChange,
  };
};
