import type {
  MaterialIcon,
  SFSymbolIcon,
} from 'expo-router/unstable-native-tabs';
import type { ParseKeys } from 'i18next';

type SfSymbolConfig = SFSymbolIcon['sf'];
type MaterialSymbolConfig = MaterialIcon['md'];

export interface TabConfig {
  labelKey: ParseKeys;
  md: MaterialSymbolConfig;
  name: string;
  sf: SfSymbolConfig;
  testID: string;
}

export const TABS_CONFIG = [
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
