import { useState } from 'react';
import semverLt from 'semver/functions/lt';

import { config } from '$core/constants';
import {
  useGetRemoteConfigSync,
  type VersionFlagType,
} from '$core/featureFlags';

import { useRunOnMount } from './useRunOnMount';

export const useIsNewStoreVersionAvailable = () => {
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useRunOnMount(() => {
    const payload = getFlagPayloadSync<VersionFlagType>(
      'latest-released-app-version',
    );

    if (!payload) {
      return;
    }

    const latestReleasedVersion = payload.version;

    const isCurrentAppBelowStoreVersion = semverLt(
      config.version,
      latestReleasedVersion,
    );

    setShouldShowBanner(isCurrentAppBelowStoreVersion);
  });

  return { shouldShowBanner };
};
