import React, { Component, PropTypes } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './routes';
import { dummyFetch } from './actions/dummyActions';

class Router extends Component {
  componentDidMount() {
    this.props.dispatch(dummyFetch());
  }
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

Router.propTypes = {
  dispatch: PropTypes.func.isRequired,

  nav: PropTypes.shape({
    index: PropTypes.number.isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
