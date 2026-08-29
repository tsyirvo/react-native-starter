import { useTranslation } from 'react-i18next';

import { Separator, Stack, Text } from '$shared/uiKit';

import { InformationBlock } from './InformationBlock';

export const Informations = () => {
  const { t } = useTranslation();

  return (
    <>
      <InformationBlock
        content={t('homeScreen.motivation.content')}
        title={t('homeScreen.motivation.title')}
      />

      <Stack gap="spacing_8" pb="spacing_12" pt="spacing_24">
        <Separator />
        <Text variant="xLarge">{t('homeScreen.whatIsInside')}</Text>
      </Stack>

      <Stack gap="spacing_24">
        <InformationBlock
          content={t('homeScreen.formatting.content')}
          title={t('homeScreen.formatting.title')}
        />
        <InformationBlock
          content={t('homeScreen.storybook.content')}
          title={t('homeScreen.storybook.title')}
        />
        <InformationBlock
          content={t('homeScreen.tests.content')}
          title={t('homeScreen.tests.title')}
        />
        <InformationBlock
          content={t('homeScreen.tools.content')}
          title={t('homeScreen.tools.title')}
        />
      </Stack>
    </>
  );
};
