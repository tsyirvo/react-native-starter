import React, { Component } from 'react';
import { View, Text, NavigationExperimental, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

const { CardStack: NavigationCardStack } = NavigationExperimental;
const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Hello from Home</Text>
    </View>
  );
};

const reducer = (state) => {
  if (!state) {
    return {
      index: 0,
      routes: [{ key: 'Home' }]
    };
  }

  return null;
};

class NavigationCardStackExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navState: reducer()
    };
  }

  _renderScene(props) {
    switch (props.scene.route.key) {
      case 'Home':
        return <Home />;
      default:
        return null;
    }
  }

  render() {
    const { navState } = this.state;

    return (
      <NavigationCardStack
        navigationState={navState}
        renderScene={this._renderScene}
      />
    );
  }
}

export default NavigationCardStackExample;
