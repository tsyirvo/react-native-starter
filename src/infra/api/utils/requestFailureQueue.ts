import type { Mutation, Query } from '@tanstack/react-query';

import { Logger } from '$infra/logger';

import {
  clearTokens,
  refreshToken as requestNewAccessToken,
  saveNewAccessToken,
  saveNewRefreshToken,
} from '../token';

let isRefreshing = false;
let failedQueue: {
  query?: Query<unknown, unknown, unknown>;
  mutation?: Mutation<unknown, unknown>;
  variables?: unknown;
}[] = [];

const processFailedQueue = () => {
  failedQueue.forEach(({ query, mutation, variables }) => {
    if (mutation) {
      const { options } = mutation;

      mutation.setOptions(options);
      mutation.execute(variables).catch((error: unknown) => {
        Logger.error({
          error,
          message: 'Error while executing a mutation from the failed queue',
        });
      });
    }

    if (query)
      query.fetch().catch((error: unknown) => {
        Logger.error({
          error,
          message: 'Error while fetching a query from the failed queue',
        });
      });
  });

  isRefreshing = false;
  failedQueue = [];
};

export const refreshAccessTokenAndRetry = async (
  query?: Query<unknown, unknown, unknown>,
  mutation?: Mutation<unknown, unknown>,
  variables?: unknown,
) => {
  try {
    if (isRefreshing) {
      failedQueue.push({ query, mutation, variables });
    } else {
      isRefreshing = true;
      failedQueue.push({ query, mutation, variables });

      const { accessToken, refreshToken } = await requestNewAccessToken();

      await Promise.all([
        saveNewAccessToken(accessToken),
        saveNewRefreshToken(refreshToken),
      ]);

      processFailedQueue();
    }
  } catch {
    clearTokens().catch((error: unknown) => {
      Logger.error({
        error,
        message: 'Error while clearing the tokens',
      });
    });
  }
};
