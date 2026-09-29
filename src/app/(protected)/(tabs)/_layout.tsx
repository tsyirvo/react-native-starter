import {
  type MaterialIcon,
  NativeTabs,
  type SFSymbolIcon,
} from 'expo-router/unstable-native-tabs';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { IS_ANDROID, SUPPORTS_LIQUID_GLASS } from '$domain/constants';

type SfSymbolConfig = SFSymbolIcon['sf'];
type MaterialSymbolConfig = MaterialIcon['md'];

interface TabConfig {
  labelKey: ParseKeys;
  md: MaterialSymbolConfig;
  name: string;
  sf: SfSymbolConfig;
  testID: string;
}

const TABS_CONFIG = [
  {
    labelKey: 'tabs.home',
    md: { default: 'home', selected: 'home' },
    name: '(home)',
    sf: { default: 'house', selected: 'house.fill' },
    testID: 'HomeIcon',
  },
  {
    labelKey: 'tabs.features',
    md: { default: 'grid_view', selected: 'grid_view' },
    name: 'features',
    sf: { default: 'square.grid.2x2', selected: 'square.grid.2x2.fill' },
    testID: 'FeaturesIcon',
  },
  {
    labelKey: 'tabs.profile',
    md: { default: 'person', selected: 'person' },
    name: '(profile)',
    sf: { default: 'person.crop.circle', selected: 'person.crop.circle.fill' },
    testID: 'ProfileIcon',
  },
] as const satisfies readonly TabConfig[];

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
        default: styles.defaultLabel,
        selected: styles.selectedLabel,
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
  defaultLabel: {
    color: theme.colors.content_secondary,
  },
  selectedLabel: {
    color: theme.colors.core_primary,
  },
}));

export default TabLayout;
