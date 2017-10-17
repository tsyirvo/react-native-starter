import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from './Button';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

const Controls = ({ onIncrement, onDecrement, resetCounter }) => {
  return (
    <View>
      <View style={styles.container}>
        <Button
          title="+"
          action={() => { onIncrement(); }}
        />
        <Button
          title="-"
          action={() => { onDecrement(); }}
        />
      </View>
      <Button
        title="Reset"
        action={() => { resetCounter(); }}
      />
    </View>
  );
};

Controls.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  resetCounter: PropTypes.func.isRequired,
};

export default Controls;
