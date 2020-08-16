import React, { useState, useEffect, ReactElement } from 'react';

import Text from '@shared/Text';

type Props = {
  delay?: number;
};

const Fallback = ({ delay }: Props): ReactElement => {
  const [showLoading, toggleLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => toggleLoading(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return <>{showLoading && <Text>Loading ...</Text>}</>;
};

Fallback.defaultProps = {
  delay: 500,
};

export default Fallback;
