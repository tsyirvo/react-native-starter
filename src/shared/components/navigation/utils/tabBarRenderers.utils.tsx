import { TabBarIcon } from '../components';

interface TabBarIconType {
  focused: boolean;
}

export const renderHomeIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon iconName="Home" isFocused={focused} />
);

export const renderFeaturesIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon iconName="Apps" isFocused={focused} />
);

export const renderProfileIcon = ({ focused }: TabBarIconType) => (
  <TabBarIcon iconName="User" isFocused={focused} />
);
