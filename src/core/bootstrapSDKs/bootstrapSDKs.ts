import FeatureFlags from '$core/featureFlags';
import Logger from '$core/logger';
import { errors } from '$core/monitoring/constants';

const initFeatureFlags = () => {
  FeatureFlags.init().catch((error: Error) => {
    Logger.error({
      error,
      type: errors.flagsmith,
      message: 'Error during init',
    });
  });
};

export const bootstrapSDKs = () => {
  initFeatureFlags();
};
