import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions as routing } from 'react-native-router-flux';
import shallowequal from 'shallowequal';

import Button from '../shared/Button';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class About extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowequal(nextProps, this.props) && shallowequal(nextState, this.state);
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>About</Text>
        <Button
          label={'Go back'}
          action={() => { routing.pop(); }}
        />
      </View>
    );
  }
}

export default About;
