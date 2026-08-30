import { useTranslation } from 'react-i18next';
import { Alert, ScrollView } from 'react-native';

import { drawables } from '$shared/icons';
import type { ScreenTitleToolbarItem } from '$shared/uiKit';
import { Box, ScreenTitle, Separator, Stack, Text } from '$shared/uiKit';

const SHOWCASE_SECTIONS = [
  'largeTitle',
  'toolbar',
  'nativeFeel',
  'scrollForMore',
] as const;

const ScreenTitleShowcaseScreen = () => {
  const { t } = useTranslation();

  const onInfoPress = () => {
    Alert.alert(
      t('screenTitleShowcaseScreen.alert.title'),
      t('screenTitleShowcaseScreen.alert.description'),
    );
  };

  const toolbar: ScreenTitleToolbarItem[] = [
    {
      icon: 'info.circle',
      iconSource: drawables.infoCircle,
      id: 'info',
      label: t('screenTitleShowcaseScreen.toolbarButton'),
      onPress: onInfoPress,
    },
  ];

  return (
    <>
      <ScreenTitle
        isLarge
        title={t('screenTitleShowcaseScreen.title')}
        toolbar={toolbar}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Stack gap="spacing_24" px="spacing_16" py="spacing_24">
          {SHOWCASE_SECTIONS.map((section) => (
            <Stack gap="spacing_8" key={section}>
              <Text variant="large">
                {t(`screenTitleShowcaseScreen.sections.${section}.title`)}
              </Text>

              <Text color="content_secondary">
                {t(`screenTitleShowcaseScreen.sections.${section}.content`)}
              </Text>

              <Box pt="spacing_8">
                <Separator />
              </Box>
            </Stack>
          ))}
        </Stack>
      </ScrollView>
    </>
  );
};

export default ScreenTitleShowcaseScreen;
