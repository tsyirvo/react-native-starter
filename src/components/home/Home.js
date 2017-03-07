import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from './items/Header';
import Button from '../shared/Button';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '$textColors.red',
    fontSize: '1.5rem',
  },
});

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Home </Text>
      <Button
        label={'Go to About page'}
        action={() => { navigation.navigate('About'); }}
      />
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default Home;
