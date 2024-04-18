import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Logger } from '$core/logger';
import { useRunOnMount } from '$shared/hooks/useRunOnMount';
import { Button } from '$shared/uiKit/button';
import { Box, Text } from '$shared/uiKit/primitives';
import { checkForNativeUpdate } from '$shared/utils/checkForAppUpdates';

type UpdateStatus = {
  shouldUpdate: boolean;
  startUpdate: () => Promise<void>;
  storeVersion: string | null;
  currentVersion: string | null;
};

export const StoreUpdateBanner = () => {
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>();

  const { t } = useTranslation('settings');

  useRunOnMount(() => {
    checkForNativeUpdate({
      title: t('updateAvailable.nativePrompt.title'),
      message: t('updateAvailable.nativePrompt.message'),
      buttonUpgradeText: t('updateAvailable.nativePrompt.updateCta'),
      buttonCancelText: t('cancel', {
        ns: 'common',
      }),
    })
      .then((status) => {
        setUpdateStatus(status);
      })
      .catch((error: unknown) => {
        Logger.error({
          error,
          level: 'warning',
          message: 'Failed to check for native update',
        });
      });
  });

  if (!updateStatus?.shouldUpdate) return null;

  return (
    <Box bg="neutral" borderRadius="radius_8" px="spacing_16" py="spacing_8">
      <Text textAlign="center">
        {updateStatus.storeVersion
          ? t('updateAvailable.banner.compareVersions', {
              currentVersion: updateStatus.currentVersion,
              storeVersion: updateStatus.storeVersion,
            })
          : t('updateAvailable.banner.defaultTitle')}
      </Text>

      <Box alignItems="center" pt="spacing_8">
        <Button.Text onPress={updateStatus.startUpdate}>
          {t('updateAvailable.banner.updateCta')}
        </Button.Text>
      </Box>
    </Box>
  );
};
