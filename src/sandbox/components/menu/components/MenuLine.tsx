import React from 'react';
import { Pressable } from 'react-native';

import { Box, Text } from '$components/shared/primitives';

import Separator from './Separator';

type MenuLineProps = {
  label: string;
  onPress: () => void;
};

const MenuLine = ({ label, onPress }: MenuLineProps) => (
  <Box pb="small">
    <Pressable onPress={onPress}>
      <Text mb="small">{label}</Text>
    </Pressable>

    <Separator color="grey" />
  </Box>
);

export default MenuLine;
