import React, { useEffect, useState } from 'react';

import { Text } from '$components/shared/primitives';

type Props = {
  delay?: number;
};

const Fallback = ({ delay }: Props) => {
  const [isShowingLoading, toggleLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => toggleLoading(true), delay);

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
