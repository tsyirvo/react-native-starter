import { useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';

interface UseRefreshOnFocusOptions {
  shouldRefetchAll?: boolean;
}

export const useRefreshOnFocus = (options?: UseRefreshOnFocusOptions) => {
  const { shouldRefetchAll = false } = options ?? {};

  const isFirstTimeRef = useRef(true);

  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      // Skip the first focus to avoid double-fetching on initial mount
      if (isFirstTimeRef.current) {
        isFirstTimeRef.current = false;

        return;
      }

      if (shouldRefetchAll) {
        void queryClient.refetchQueries({
          type: 'active',
        });
      } else {
        void queryClient.refetchQueries({
          stale: true,
          type: 'active',
        });
      }
    }, [queryClient, shouldRefetchAll]),
  );
};
