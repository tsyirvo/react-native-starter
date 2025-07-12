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
  const IconComponent = AllIcons[name];

  return (
    <IconComponent
      color={color}
      width={width}
      height={height}
      testID={testID}
    />
  );
};
