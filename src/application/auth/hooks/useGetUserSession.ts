import { useQuery } from '@tanstack/react-query';

import { sleep } from '$shared/utils';

import { authKeys } from '../queries';

export const useGetUserSession = () => {
  // TODO(prod): Implement this logic
  const getUserSession = async () => {
    await sleep(500);

    return {
      isFetched: true,
      isError: false,
      error: null,
      failureCount: 0,
    };
  };

  return useQuery({
    queryKey: authKeys.session(),
    queryFn: getUserSession,
    retry: false,
  });
};
