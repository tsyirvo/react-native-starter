import React, { PropTypes } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './routes';

function Router({ dispatch, nav }) {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
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
  nav: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
