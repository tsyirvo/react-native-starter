import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';

import {
  renderFeaturesIcon,
  renderHomeIcon,
  renderProfileIcon,
} from '$shared/components';

const TabLayout = () => {
  const { t } = useTranslation();

  const { theme } = useUnistyles();

  return (
    <Tabs
      backBehavior="order"
      screenOptions={{
        ...globalScreenOptions,
        tabBarActiveTintColor: theme.colors.core_primary,
        tabBarInactiveTintColor: theme.colors.content_secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.bg_base,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: renderHomeIcon }} />

      <Tabs.Screen
        name="features"
        options={{ tabBarIcon: renderFeaturesIcon, title: t('tabs.features') }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.border_default,
            color: theme.colors.core_primary,
          },
          tabBarIcon: renderProfileIcon,
        }}
      />
    </Tabs>
  );
};

const globalScreenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

export default TabLayout;
