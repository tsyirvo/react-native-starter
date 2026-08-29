import { TabBarIcon } from '../components';

interface TabBarIconType {
  focused: boolean;
}

export const renderHomeIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon iconName="Home" isFocused={focused} testID="HomeIcon" />
);

export const renderFeaturesIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon iconName="Apps" isFocused={focused} testID="FeaturesIcon" />
);

export const renderProfileIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon iconName="User" isFocused={focused} testID="ProfileIcon" />
);
