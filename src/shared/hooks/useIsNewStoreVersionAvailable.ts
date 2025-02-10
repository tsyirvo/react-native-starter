import { useState } from 'react';
import semverLt from 'semver/functions/lt';

import { config } from '$core/constants';
import { useGetFlagValueSync } from '$core/featureFlags';

import { useRunOnMount } from './useRunOnMount';

export const useIsNewStoreVersionAvailable = () => {
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  const { getFlagValueSync } = useGetFlagValueSync();

  useRunOnMount(() => {
    const latestReleasedVersion = getFlagValueSync(
      'latest-released-app-version',
    );

    if (!latestReleasedVersion || typeof latestReleasedVersion !== 'string') {
      // We can't get latest released version, so leave the app running
      return;
    }

    const isCurrentAppBelowStoreVersion = semverLt(
      config.version,
      latestReleasedVersion,
    );

    setShouldShowBanner(isCurrentAppBelowStoreVersion);
  });

  return { shouldShowBanner };
};
