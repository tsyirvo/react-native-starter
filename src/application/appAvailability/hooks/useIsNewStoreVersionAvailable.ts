import { useState } from 'react';

import { config } from '$infra/config';
import {
  useGetRemoteConfigSync,
  type VersionFlagType,
} from '$infra/featureFlags';
import { useRunOnMount } from '$shared/hooks';
import { isVersionBelow } from '$shared/utils';

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

    const isCurrentAppBelowStoreVersion = isVersionBelow(
      config.version,
      latestReleasedVersion,
    );

    setShouldShowBanner(isCurrentAppBelowStoreVersion);
  });

  return { shouldShowBanner };
};
