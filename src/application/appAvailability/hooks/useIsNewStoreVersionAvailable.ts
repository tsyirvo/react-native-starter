import { useState } from 'react';
import semverLt from 'semver/functions/lt';

import { config } from '$infra/config';
import {
  useGetRemoteConfigSync,
  type VersionFlagType,
} from '$infra/featureFlags';
import { useRunOnMount } from '$shared/hooks';

export const useIsNewStoreVersionAvailable = () => {
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  const { getFlagPayloadSync } = useGetRemoteConfigSync();

  useRunOnMount(() => {
    const payload = getFlagPayloadSync<VersionFlagType>(
      'latest-released-app-version',
    );

    if (!(payload && 'version' in payload)) {
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
