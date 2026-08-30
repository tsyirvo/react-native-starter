import { Stack } from 'expo-router';

import { useStackScreenOptions } from '$shared/components';

const HomeLayout = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default HomeLayout;
