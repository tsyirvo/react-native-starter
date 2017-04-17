import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: {
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  examples: {
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '$colors.black',
    marginBottom: 15,
  },
});

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text>Home component</Text>
        </View>

        <View style={styles.examples}>
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => { navigation.navigate('Counter'); }
            }
          >
            <Text>Go to counter example</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={
              () => { navigation.navigate('Posts'); }
            }
          >
            <Text>Go to posts API example</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Home;
