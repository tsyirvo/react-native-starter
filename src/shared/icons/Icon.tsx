import type { ColorValue } from 'react-native';
import { createNanoIconSet } from 'react-native-nano-icons';

import glyphMap from './font/AppIcons.glyphmap.json';

const NanoIcon = createNanoIconSet(glyphMap);

export type IconName = keyof typeof glyphMap.i;

interface IconProps {
  accessibilityLabel?: string;
  color?: ColorValue;
  name: IconName;
  size: number;
  testID?: string;
}

export const Icon = ({
  accessibilityLabel,
  color,
  name,
  size,
  testID = 'Icon',
}: IconProps) => {
  const isDecorative = accessibilityLabel === undefined;

  return (
    <NanoIcon
      accessibilityElementsHidden={isDecorative}
      accessibilityLabel={accessibilityLabel}
      accessible={!isDecorative}
      color={color}
      importantForAccessibility={isDecorative ? 'no-hide-descendants' : 'yes'}
      name={name}
      size={size}
      testID={testID}
    />
  );
};
