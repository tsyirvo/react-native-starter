import React from 'react';
import { View, Text } from 'react-native';

import Button from 'shared/Button';

const Home = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Component</Text>

    <Button onPress={() => navigation.navigate('Details')}>
      <Text>Go to details</Text>
    </Button>
  </View>
);

export default Home;
