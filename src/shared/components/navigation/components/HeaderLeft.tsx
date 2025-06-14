import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { DEFAULT_ICON_SIZE, HIT_SLOP } from '$domain/constants/styling';
import { useAppTheme } from '$domain/theme';
import { Icon } from '$shared/icons';

export const HeaderLeft = () => {
  const router = useRouter();

  const { colors } = useAppTheme();

  return (
    <Pressable hitSlop={HIT_SLOP} onPress={router.back}>
      <Icon
        name="LeftArrow"
        width={DEFAULT_ICON_SIZE}
        height={DEFAULT_ICON_SIZE}
        color={colors.content_primary}
      />
    </Pressable>
  );
};
