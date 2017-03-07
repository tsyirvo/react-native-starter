import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../shared/Button';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function About({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Button
        label={'Go back'}
        action={() => { navigation.goBack(); }}
      />
    </View>
  );
}

About.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default About;
