import { Pressable } from 'react-native';

import { Box, Text } from '$shared/uiKit/primitives';

import { Separator } from './Separator';

type MenuLineProps = {
  label: string;
  onPress: () => void;
};

export function MenuLine({ label, onPress }: MenuLineProps) {
  return (
    <Box pb="spacing_8">
      <Pressable onPress={onPress}>
        <Text mb="spacing_8">{label}</Text>
      </Pressable>

      <Separator color="secondary_100" />
    </Box>
  );
}
