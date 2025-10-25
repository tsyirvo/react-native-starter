import { useRouter } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { DEFAULT_ICON_SIZE, HIT_SLOP } from '$domain/constants/styling';
import { Pressable } from '$shared/components';
import { Icon } from '$shared/icons';

export const HeaderLeft = () => {
  const router = useRouter();

  const { theme } = useUnistyles();

  return (
    <Pressable hitSlop={HIT_SLOP} onPress={router.back}>
      <Icon
        name="LeftArrow"
        width={DEFAULT_ICON_SIZE}
        height={DEFAULT_ICON_SIZE}
        color={theme.colors.content_primary}
      />
    </Pressable>
  );
};
