import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { dummyFetch } from './homeActions';

import Header from './items/Header';
import Button from '../shared/Button';

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

class Home extends Component {

  componentDidMount() {
    this.props.fetchData(dummyFetch);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.text}>Home </Text>
        <Button
          label={'Go to About page'}
          action={() => { this.props.navigation.navigate('About'); }}
        />
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(dummyFetch());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
