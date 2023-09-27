import React from 'react';

import * as AllIcons from './components';

type Name = keyof typeof AllIcons;

type IconProps = {
  name: Name;
  color?: string;
};

export function Icon({ name, color }: IconProps) {
  return React.createElement(AllIcons[name], {
    color,
  });
}
