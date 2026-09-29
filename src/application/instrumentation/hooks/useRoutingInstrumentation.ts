import { useNavigationContainerRef } from 'expo-router';

import { routingInstrumentation } from '$infra/monitoring';
import { useRunOnMount } from '$shared/hooks';

export const useRoutingInstrumentation = () => {
  const ref = useNavigationContainerRef();

  useRunOnMount(() => {
    routingInstrumentation.registerNavigationContainer(ref);
  });
};
