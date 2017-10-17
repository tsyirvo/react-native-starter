import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Value from './Value';
import Controls from './Controls';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const Counter = ({ count, onIncrement, onDecrement, resetCounter }) => {
  return (
    <View style={styles.container}>
      <Value value={count} />
      <Controls
        onIncrement={() => { onIncrement(); }}
        onDecrement={() => { onDecrement(); }}
        resetCounter={() => { resetCounter(); }}
      />
    </View>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  resetCounter: PropTypes.func.isRequired,
};

export default Counter;
