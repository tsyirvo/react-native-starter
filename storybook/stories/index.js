import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook'; // eslint-disable-line
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../../src/components/shared/Button';
import CenterView from './CenterView';
import theme from '../../src/styles/appStyles';

EStyleSheet.build(theme);

const firstButton = (
  <Button
    label="First Button"
    action={() => {
      linkTo('Button', 'Second')();
      return action('First Button clicked')();
    }}
  />
);

const secondButton = (
  <Button
    label="Second Button"
    action={linkTo('Button', 'First')}
  />
);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('First', () => firstButton)
  .add('Second', () => secondButton);
