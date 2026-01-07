import * as AllIcons from './components';

type Name = keyof typeof AllIcons;

interface IconProps {
  name: Name;
  fill?: string;
  width?: number;
  height?: number;
  testID?: string;
}

export const Icon = ({
  name,
  fill,
  width,
  height,
  testID = 'Icon',
}: IconProps) => {
  const IconComponent = AllIcons[name];

  return (
    <IconComponent fill={fill} width={width} height={height} testID={testID} />
  );
};
