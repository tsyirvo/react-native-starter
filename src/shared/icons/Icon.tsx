import React from 'react';

import * as AllIcons from './components';

type Name = keyof typeof AllIcons;

type IconProps = {
  name: Name;
  color?: string;
};

export const Icon = ({ name, color }: IconProps) =>
  React.createElement(AllIcons[name], {
    color,
  });
