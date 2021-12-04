import React from 'react';

import { Text, Title } from '$components/shared/primitives';
import theme from '$styles/theme';

import CenteredContent from '../menu/components/CenteredContent';

const FontSizesDebugPage = () => (
  <CenteredContent>
    {(Object.keys(theme.fontSizes) as (keyof typeof theme.fontSizes)[]).map(
      (size) => {
        if (size === 'xLarge') {
          return (
            <Title key={size} variant={size} mb="medium">
              {`This is a ${size} text`}
            </Title>
          );
        }

        return (
          <Text key={size} variant={size} mb="medium">
            {`This is a ${size} text`}
          </Text>
        );
      },
    )}
  </CenteredContent>
);

export default FontSizesDebugPage;
