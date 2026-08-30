import { Stack } from 'expo-router';

import { useStackScreenOptions } from '$shared/components';

const ProfileLayout = () => {
  const screenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="Profile" />
    </Stack>
  );
};

export default ProfileLayout;
