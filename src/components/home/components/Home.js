import React from 'react';
import { View, Text } from 'react-native';
import Config from 'react-native-config';

import Button from 'shared/Button';

const Home = ({ navigation }) => {
  console.log('config', Config.NODE_ENV);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Component</Text>

      <Button onPress={() => navigation.navigate('Details')}>
        <Text>Go to details</Text>
      </Button>
    </View>
  );
};

export default Home;
