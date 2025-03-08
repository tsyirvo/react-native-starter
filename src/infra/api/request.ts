import type { GraphQLClient } from 'graphql-request';
import type {
  GraphQLClientRequestHeaders,
  Variables,
} from 'graphql-request/build/esm/types';

import { config } from '$domain/constants';

import { getAuthorizationHeader } from './token';
import { getAppIdentifier, getQueryClient } from './utils/request.utils';

let client: GraphQLClient | undefined;

export const request =
  <TData, TVariables extends Variables>(
    query: string,
    variables?: TVariables,
    options?: GraphQLClientRequestHeaders,
  ): (() => Promise<TData>) =>
  async () => {
    client = getQueryClient(config.apiURL);

    if (options) client.setHeaders(options);
    client.setHeader('app-id', getAppIdentifier());
    client.setHeader('app-version', config.version);

    const authHeader = await getAuthorizationHeader();

    if (authHeader !== '') client.setHeader('authorization', authHeader);

    return client.request(query, variables);
  };
