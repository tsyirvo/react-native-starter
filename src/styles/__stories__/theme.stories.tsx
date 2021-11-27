/* eslint-disable import/no-extraneous-dependencies */

import { storiesOf } from '@storybook/react-native';
import React, { Fragment } from 'react';
import { ScrollView } from 'react-native';

import CenteredContent from '$components/shared/CenteredContent';
import { Box, Text, Title } from '$components/shared/primitives';

import theme from '../theme';

storiesOf('Theme', module)
  .add('Spaces', () => (
    <CenteredContent>
      {(Object.keys(theme.space) as (keyof typeof theme.space)[]).map(
        (space) => (
          <Fragment key={space}>
            <Text>{`${space} - ${theme.space[space]}px`}</Text>
            <Box
              width="100%"
              height={theme.space[space]}
              bg="grey"
              mb={theme.space[space]}
            />
          </Fragment>
        ),
      )}
    </CenteredContent>
  ))
  .add('Colors', () => (
    <ScrollView>
      <CenteredContent mb={150}>
        {(Object.keys(theme.colors) as (keyof typeof theme.colors)[]).map(
          (color) => (
            <Box alignItems="center" key={color} mb={25}>
              <Text>{color}</Text>
              <Box size={100} bg={theme.colors[color]} />
            </Box>
          ),
        )}
      </CenteredContent>
    </ScrollView>
  ))
  .add('FontSizes', () => (
    <CenteredContent>
      {(
        Object.keys(theme.fontSizes) as (keyof typeof theme.fontSizes)[]
      ).map((size) => {
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
      })}
    </CenteredContent>
  ))
  .add('Radiuses', () => (
    <CenteredContent>
      {Object.keys(theme.radii).map((radius) => (
        <Box alignItems="center" key={radius} mb={25}>
          <Text>{radius}</Text>
          <Box width={100} height={100} bg="grey" borderRadius={radius} />
        </Box>
      ))}
    </CenteredContent>
  ));
