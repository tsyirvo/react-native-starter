import { GraphQLClient } from 'graphql-request';
import type {
  GraphQLClientRequestHeaders,
  Variables,
} from 'graphql-request/build/esm/types';
import i18next from 'i18next';
import memoize from 'lodash.memoize';

import { config } from '$core/constants';
import { getCurrentLocale } from '$core/i18n/utils/getCurrentLocale';

import { getAuthorizationHeader } from './token';
import { getAppIdentifier } from './utils/request.utils';

const getClientEndpoint = (env: string) =>
  `${env}?lang=${getCurrentLocale(i18next)}`;

const getQueryClient = memoize(
  (env: string) => new GraphQLClient(getClientEndpoint(env)),
  (...args) => args.join('_'),
);

let client: GraphQLClient | undefined;

export const request =
  <TData, TVariables extends Variables>(
    query: string,
    variables?: TVariables,
    options?: GraphQLClientRequestHeaders,
  ): (() => Promise<TData>) =>
  async () => {
    client = getQueryClient(config.apiURL);
    client.setEndpoint(getClientEndpoint(config.apiURL));

    if (options) client.setHeaders(options);
    client.setHeader('app-id', getAppIdentifier());
    client.setHeader('app-version', config.version);

    const authHeader = await getAuthorizationHeader();

    client.setHeader('authorization', authHeader);

    return client.request(query, variables);
  };
