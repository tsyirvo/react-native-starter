import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
});

function Header() {
  return (
    <View style={styles.container}>
      <Text>This is the header</Text>
    </View>
  );
}

export default Header;
