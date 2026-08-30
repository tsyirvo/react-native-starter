import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

const FeaturesLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: t('tabs.features') }}
      />
    </Stack>
  );
};

const globalScreenOptions = {
  gestureEnabled: true,
  headerShown: true,
};

export default FeaturesLayout;
