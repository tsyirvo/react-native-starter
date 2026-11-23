import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useUnistyles } from 'react-native-unistyles';

import { Pressable } from '$shared/components';
import { Icon } from '$shared/icons';
import { DEFAULT_ICON_SIZE, HIT_SLOP } from '$shared/uiKit/constants';

export const HeaderLeft = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { theme } = useUnistyles();

  return (
    <Pressable
      accessibilityLabel={t('common.back')}
      accessibilityRole="button"
      hitSlop={HIT_SLOP}
      onPress={() => router.back()}
    >
      <Icon color={theme.colors.content_primary} name="left-arrow" size={DEFAULT_ICON_SIZE} />
    </Pressable>
  );
};
