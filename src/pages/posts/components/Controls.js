import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginRight: 10,
    marginVertical: 15,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '$colors.black',
  },
});

const Controls = ({ filterBy }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { filterBy('all'); }}
      >
        <Text>Show all</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => { filterBy('user'); }}
      >
        <Text>Filter posts for user 1</Text>
      </TouchableOpacity>
    </View>
  );
};

Controls.propTypes = {
  filterBy: PropTypes.func.isRequired,
};

export default Controls;
