import { TabBarIcon } from '../components';

interface TabBarIconType {
  focused: boolean;
}

export const renderHomeIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon testID="HomeIcon" iconName="Home" isFocused={focused} />
);

export const renderFeaturesIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon testID="FeaturesIcon" iconName="Apps" isFocused={focused} />
);

export const renderProfileIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon testID="ProfileIcon" iconName="User" isFocused={focused} />
);
