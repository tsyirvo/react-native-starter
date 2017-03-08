import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../header/Header';
import Button from '../shared/Button';

import * as dummyActions from '../../actions/dummyActions';

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

function mockFunction(actions, navigation) {
  return () => {
    actions.firstActionCreator('HEllooooooooo');
    navigation.navigate('About');
  };
}

function Home({ actions, navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Home </Text>
      <Button
        label={'Go to About page'}
        action={mockFunction(actions, navigation)}
      />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dummyActions, dispatch),
  };
}

Home.propTypes = {
  actions: PropTypes.shape({
    firstActionCreator: PropTypes.func.isRequired,
  }).isRequired,

  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Home);
