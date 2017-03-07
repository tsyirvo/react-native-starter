import React, { PropTypes } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '$itemColors.regular',
  },
});

function Button({ label, action }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={styles.container}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  label: '',
  action: () => {},
};

Button.propTypes = {
  label: PropTypes.string,
  action: PropTypes.func,
};

export default Button;
