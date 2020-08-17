/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Box, Flex, Text, Title } from '@shared/primitives';
import theme from '../theme';

storiesOf('Theme', module)
  .add('Spaces', () => (
    <>
      {Object.keys(theme.space).map((space) => (
        <Box key={space}>
          <Text>{`Space - ${space} - ${theme.space[space]}px`}</Text>
          <Box
            width="100%"
            height={theme.space[space]}
            bg="grey"
            mb={theme.space[space]}
          />
        </Box>
      ))}
    </>
  ))
  .add('Colors', () => (
    <ScrollView>
      <Flex mb={150} alignItems="center">
        {Object.keys(theme.colors).map((color) => (
          <Box alignItems="center" key={color} mb={25}>
            <Text>{color}</Text>
            <Box size={100} bg={theme.colors[color]} />
          </Box>
        ))}
      </Flex>
    </ScrollView>
  ))
  .add('FontSizes', () => (
    <>
      {Object.keys(theme.fontSizes).map((size) => {
        if (size === 'xLarge')
          return (
            <Title key={size} variant={size} mb="medium">
              {`This is a ${size} text`}
            </Title>
          );

        return (
          <Text key={size} variant={size} mb="medium">
            {`This is a ${size} text`}
          </Text>
        );
      })}
    </>
  ))
  .add('Radiuses', () => (
    <Flex mb={150} alignItems="center">
      {Object.keys(theme.radii).map((radius) => (
        <Box alignItems="center" key={radius} mb={25}>
          <Text>{radius}</Text>
          <Box width={100} height={100} bg="grey" borderRadius={radius} />
        </Box>
      ))}
    </Flex>
  ));
