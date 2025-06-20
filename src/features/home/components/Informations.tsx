import { useTranslation } from 'react-i18next';

import { Box, Separator, Text } from '$shared/uiKit';

import { InformationBlock } from './InformationBlock';

export const Informations = () => {
  const { t } = useTranslation();

  return (
    <>
      <InformationBlock
        title={t('homeScreen.motivation.title')}
        content={t('homeScreen.motivation.content')}
      />

      <Box gap="spacing_8" pt="spacing_24" pb="spacing_12">
        <Separator />
        <Text variant="xLarge">{t('homeScreen.whatIsInside')}</Text>
      </Box>

      <Box gap="spacing_24">
        <InformationBlock
          title={t('homeScreen.formatting.title')}
          content={t('homeScreen.formatting.content')}
        />
        <InformationBlock
          title={t('homeScreen.storybook.title')}
          content={t('homeScreen.storybook.content')}
        />
        <InformationBlock
          title={t('homeScreen.tests.title')}
          content={t('homeScreen.tests.content')}
        />
        <InformationBlock
          title={t('homeScreen.tools.title')}
          content={t('homeScreen.tools.content')}
        />
      </Box>
    </>
  );
};
