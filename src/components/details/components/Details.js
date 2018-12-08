import React from 'react';
import { View, Text } from 'react-native';

import Button from 'shared/Button';

const Details = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Details Component</Text>

    <Button onPress={() => navigation.goBack(null)}>
      <Text>Go back</Text>
    </Button>
  </View>
);

export default Details;
