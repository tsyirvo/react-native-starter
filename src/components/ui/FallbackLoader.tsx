import { useEffect, useState } from 'react';

import { Text } from '$components/ui/primitives';

type Props = {
  delay?: number;
};

const Fallback = ({ delay }: Props) => {
  const [isShowingLoading, setIsShowingLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsShowingLoading(true), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  if (isShowingLoading) return <Text>Loading ...</Text>;

  return null;
};

Fallback.defaultProps = {
  delay: 500,
};

export default Fallback;
