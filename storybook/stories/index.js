import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../../src/components/shared/Button';
import CenterView from './CenterView';
import theme from '../../src/styles/appStyles';

EStyleSheet.build(theme);

storiesOf('Button', module)
  .addDecorator((getStory) => {
    return <CenterView>{getStory()}</CenterView>;
  })
  .add('First', () => {
    return <Button label='First Button' action={linkTo('Button', 'Second')} action={() => {
      linkTo('Button', 'Second')();
      return action('First Button clicked')();
    }}>
    </Button>;
  })
  .add('Second', () => {
    return <Button label='Second Button' action={linkTo('Button', 'First')}>
    </Button>;
  });
