import { useEffect, useRef } from 'react';

const usePreviousState = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousState;
