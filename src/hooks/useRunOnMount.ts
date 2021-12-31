import { useEffect } from 'react';

const useRunOnMount = (callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
};

export default useRunOnMount;
