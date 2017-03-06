import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from './items/Header';
import Button from '../shared/Button';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '$textColors.red',
    fontSize: '1.5rem'
  }
});

class Home extends PureComponent {

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.text}>Home </Text>
        <Button
          label={'Go to About page'}
          action={() => { navigate('About'); }}
        />
      </View>
    );
  }
}

export default Home;
