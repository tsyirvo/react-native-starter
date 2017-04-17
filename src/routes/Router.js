import React, { PropTypes } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './routes';

const Router = ({ dispatch, nav }) => {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
};

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

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
