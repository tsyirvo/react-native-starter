import * as AllIcons from './components';

type Name = keyof typeof AllIcons;

interface IconProps {
  fill?: string;
  height?: number;
  name: Name;
  testID?: string;
  width?: number;
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
    <IconComponent fill={fill} height={height} testID={testID} width={width} />
  );
};
