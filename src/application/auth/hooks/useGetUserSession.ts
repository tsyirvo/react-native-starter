import { useQuery } from '@tanstack/react-query';

import { sleep } from '$shared/utils';

import { authKeys } from '../queries';

export const useGetUserSession = () => {
  // TODO(prod): Implement this logic
  const getUserSession = async () => {
    await sleep(500);

    return {
      error: null,
      failureCount: 0,
      isError: false,
      isFetched: true,
    };
  };

  return useQuery({
    queryFn: getUserSession,
    queryKey: authKeys.session(),
    retry: false,
  });
};
