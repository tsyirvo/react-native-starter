import { GraphQLClient } from 'graphql-request';
import i18next from 'i18next';
import memoize from 'lodash.memoize';
import { Platform } from 'react-native';

import { config } from '$core/constants';
import { getCurrentLocale } from '$core/i18n/utils/getCurrentLocale';

export const getAppIdentifier = () => {
  // com.tsyirvo.rnstarter/2.0.0(777)_ios
  return `${config.bundleId}/${config.version}${config.buildNumber ? `(${config.buildNumber})` : ''}_${Platform.OS}`;
};

const getClientEndpoint = (env: string) =>
  `${env}?lang=${getCurrentLocale(i18next)}`;

export const getQueryClient = memoize(
  (env: string) => new GraphQLClient(getClientEndpoint(env)),
  (...args) => args.join('_'),
);
