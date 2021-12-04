import React from 'react';
import { ScrollView } from 'react-native';

import { Text, Title } from '$components/shared/primitives';
import theme from '$styles/theme';

import SandBoxItem from '../menu/components/SandboxItem';

const FontSizesSandbox = () => (
  <ScrollView>
    <SandBoxItem isSingle>
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
    </SandBoxItem>
  </ScrollView>
);

export default FontSizesSandbox;
