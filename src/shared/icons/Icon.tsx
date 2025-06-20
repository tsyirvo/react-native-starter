import React from 'react';

import * as AllIcons from './components';

type Name = keyof typeof AllIcons;

interface IconProps {
  name: Name;
  color?: string;
  width?: number;
  height?: number;
  testID?: string;
}

export const Icon = ({
  name,
  color,
  width,
  height,
  testID = 'Icon',
}: IconProps) => {
  return React.createElement(AllIcons[name], {
    color,
    width,
    height,
    testID,
  });
};
