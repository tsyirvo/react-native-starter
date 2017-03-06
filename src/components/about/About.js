import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Button from '../shared/Button';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$itemColors.blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class About extends PureComponent {

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>About</Text>
        <Button
          label={'Go back'}
          action={() => { goBack(); }}
        />
      </View>
    );
  }
}

export default About;
