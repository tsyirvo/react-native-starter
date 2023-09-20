import { Pressable } from 'react-native';

import { Box, Text } from '$shared/ui/primitives';

import { Separator } from './Separator';

type MenuLineProps = {
  label: string;
  onPress: () => void;
};

export const MenuLine = ({ label, onPress }: MenuLineProps) => (
  <Box pb="global_8">
    <Pressable onPress={onPress}>
      <Text mb="global_8">{label}</Text>
    </Pressable>

    <Separator color="grey" />
  </Box>
);
