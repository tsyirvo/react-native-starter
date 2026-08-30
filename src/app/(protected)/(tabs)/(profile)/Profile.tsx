import { useTranslation } from 'react-i18next';

import { useAuthContext } from '$domain/contexts';
import { Screen } from '$shared/components';
import type { ScreenTitleToolbarItem } from '$shared/uiKit';
import { Button, ScreenTitle, Stack, Text } from '$shared/uiKit';

const ProfileScreen = () => {
  const { t } = useTranslation();

  const { signOut } = useAuthContext();

  const onLogout = async () => {
    await signOut();
  };

  /*
   * The toolbar is optional: it is only here to showcase the API. On iOS the
   * SF Symbol is rendered in the native header, while Android falls back to
   * the label since Material headers cannot render SF Symbols.
   */
  const toolbar: ScreenTitleToolbarItem[] = [
    {
      icon: 'rectangle.portrait.and.arrow.right',
      id: 'logout',
      label: t('profileScreen.logout'),
      onPress: onLogout,
    },
  ];

  return (
    <>
      <ScreenTitle isLarge title={t('profileScreen.title')} toolbar={toolbar} />

      <Screen px="spacing_16" testID="ProfileScreen">
        <Stack gap="spacing_16" pt="spacing_8">
          <Text textAlign="center" variant="large">
            {t('profileScreen.title')}
          </Text>

          <Button.Text onPress={onLogout} testID="ProfileLogoutButton">
            {t('profileScreen.logout')}
          </Button.Text>
        </Stack>
      </Screen>
    </>
  );
};

export default ProfileScreen;
