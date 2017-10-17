import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  text: {
    fontSize: 22,
    marginBottom: 30,
  },
});

const Value = ({ value }) => {
  return (
    <View>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

Value.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Value;
