import { Redirect, Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { config } from '$domain/constants';
import { useAppTheme } from '$domain/theme';
import { useAppStore } from '$infra/store';
import {
  renderFeaturesIcon,
  renderHomeIcon,
  renderProfileIcon,
} from '$shared/components';

const TabLayout = () => {
  const isUserLoggedIn = useAppStore((state) => state.isUserLoggedIn);
  const isBootstrappingApplication = useAppStore(
    (state) => state.isBootstrappingApplication,
  );

  const { t } = useTranslation();

  const { colors } = useAppTheme();

  if (isBootstrappingApplication) return null;

  if (!isUserLoggedIn) {
    return <Redirect href="/Login" />;
  }

  return (
    <Tabs
      screenOptions={{
        ...globalScreenOptions,
        tabBarActiveTintColor: colors.core_primary,
        tabBarInactiveTintColor: colors.content_secondary,
        tabBarStyle: {
          backgroundColor: colors.bg_base,
        },
      }}
      backBehavior="order"
    >
      <Tabs.Screen name="index" options={{ tabBarIcon: renderHomeIcon }} />

      <Tabs.Screen
        name="features"
        options={{ title: t('tabs.features'), tabBarIcon: renderFeaturesIcon }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarBadge: 2,
          tabBarBadgeStyle: {
            backgroundColor: colors.border_default,
            color: colors.core_primary,
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

// eslint-disable-next-line react/no-multi-comp
const ConditionalTabLayout = () => {
  if (config.isStorybookEnabled) {
    // eslint-disable-next-line
    const StorybookUI = require('../../../../.rnstorybook').default;

    return <StorybookUI />;
  }

  return <TabLayout />;
};

export default ConditionalTabLayout;
