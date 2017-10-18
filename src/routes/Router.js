import React from 'react';
import { func, shape, number, arrayOf, string, object } from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';

import AppNavigator from './routes';

const Router = ({ dispatch, nav }) => {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
};

const mapStateToProps = state => {
  return {
    nav: state.nav,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

Router.propTypes = {
  dispatch: func.isRequired,
  nav: shape({
    index: number.isRequired,
    routes: arrayOf(
      shape({
        key: string.isRequired,
        routeName: string.isRequired,
        params: object,
      })
    ).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
