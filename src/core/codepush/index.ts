import { Alert } from 'react-native';
import codePush from 'react-native-code-push';

import Logger from '$core/logger';
import { ErrorMonitoring } from '$core/monitoring';
import { breadcrumbType, errors } from '$core/monitoring/constants';
import i18n from '$i18n/config';

const codepushOptions = {
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
};

export const restartApp = () => codePush.restartApp();

export const syncCodepush = async () => {
  await codePush.sync(codepushOptions, (status) => {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        codePush
          .getUpdateMetadata(codePush.UpdateState.LATEST)
          .then((updateState) => {
            ErrorMonitoring.breadcrumbs({
              type: breadcrumbType.info,
              message: `CodePush update v${
                updateState?.appVersion ?? 'NotFound'
              } was downloaded`,
              level: 'info',
            });

            const isMandatory = updateState?.isMandatory;

            if (isMandatory) {
              Alert.alert(
                i18n.t('codepush.title'),
                i18n.t('codepush.description'),
                [
                  {
                    text: i18n.t('codepush.cta'),
                    onPress: restartApp,
                  },
                ],
                { cancelable: false },
              );
            }
          })
          .catch((error: Error) => {
            Logger.error({
              error,
              type: errors.sdk,
              message: 'Failed to get CodePush update metadata',
            });
          });

        break;
    }
  });
};
