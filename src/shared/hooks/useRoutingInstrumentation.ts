import { useNavigationContainerRef } from 'expo-router';

import { routingInstrumentation } from '$infra/monitoring';

import { useRunOnMount } from './useRunOnMount';

export const useRoutingInstrumentation = () => {
  const ref = useNavigationContainerRef();

  useRunOnMount(() => {
    routingInstrumentation.registerNavigationContainer(ref);
  });
};
