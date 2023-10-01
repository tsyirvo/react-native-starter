import React from 'react';

import * as AllIcons from './components';

type Name = keyof typeof AllIcons;

type IconProps = {
  testID?: string;
  name: Name;
  color?: string;
  width?: number;
  height?: number;
};

export function Icon({ testID, name, color, width, height }: IconProps) {
  return React.createElement(AllIcons[name], {
    testID,
    color,
    width,
    height,
  });
}
