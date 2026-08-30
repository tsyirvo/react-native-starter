import { Stack } from 'expo-router';

import { useStackScreenOptions } from '$shared/components';

const FeaturesLayout = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={hiddenHeaderOptions} />

      <Stack.Screen name="ScreenTitleShowcase" />
    </Stack>
  );
};

const hiddenHeaderOptions = { headerShown: false };

export default FeaturesLayout;
