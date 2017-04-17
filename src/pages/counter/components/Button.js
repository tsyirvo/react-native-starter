import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '$colors.black',
  },
});

const Button = ({ title, action }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { action(); }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Button;
