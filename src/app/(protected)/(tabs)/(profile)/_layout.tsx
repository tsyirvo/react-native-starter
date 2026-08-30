import { Stack } from 'expo-router';

import { useStackScreenOptions } from '$shared/components';

const ProfileLayout = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="Profile" options={hiddenHeaderOptions} />
    </Stack>
  );
};

const hiddenHeaderOptions = { headerShown: false };

export default ProfileLayout;
