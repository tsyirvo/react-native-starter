import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { TABS_CONFIG } from '$application/navigation';
import { IS_ANDROID, SUPPORTS_LIQUID_GLASS } from '$domain/constants';

const TabLayout = () => {
  const { t } = useTranslation();

  const { theme } = useUnistyles();

  const androidTabBarProps = IS_ANDROID
    ? {
        backgroundColor: theme.colors.bg_base,
        indicatorColor: theme.colors.core_tertiary,
        rippleColor: theme.colors.core_tertiary,
        tabBarRespectsIMEInsets: true,
      }
    : {};

  const liquidGlassProps = SUPPORTS_LIQUID_GLASS
    ? { minimizeBehavior: 'onScrollDown' as const }
    : {};

  return (
    <NativeTabs
      backBehavior="history"
      disableTransparentOnScrollEdge={!SUPPORTS_LIQUID_GLASS}
      iconColor={{
        default: theme.colors.content_secondary,
        selected: theme.colors.core_primary,
      }}
      labelStyle={{
        default: { color: theme.colors.content_secondary },
        selected: { color: theme.colors.core_primary },
      }}
      tintColor={theme.colors.core_primary}
      {...androidTabBarProps}
      {...liquidGlassProps}
    >
      {TABS_CONFIG.map((tab) => (
        <NativeTabs.Trigger
          accessibilityLabel={t(tab.labelKey)}
          key={tab.name}
          name={tab.name}
          testID={tab.testID}
        >
          <NativeTabs.Trigger.Label selectedStyle={styles.selectedLabel}>
            {t(tab.labelKey)}
          </NativeTabs.Trigger.Label>

          <NativeTabs.Trigger.Icon
            md={tab.md}
            selectedColor={theme.colors.core_primary}
            sf={tab.sf}
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
};

const styles = StyleSheet.create((theme) => ({
  selectedLabel: {
    color: theme.colors.core_primary,
  },
}));

export default TabLayout;
