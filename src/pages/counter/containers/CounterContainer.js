import { connect } from 'react-redux';

import Counter from '../components/Counter';

import * as ActionTypes from '../redux/counterActionTypes';
import { resetCounter } from '../redux/counterActions';

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({ type: ActionTypes.INCREMENT_ASYNC });
    },
    onDecrement: () => {
      dispatch({ type: ActionTypes.DECREMENT_ASYNC });
    },
    resetCounter: () => {
      dispatch(resetCounter());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

export default CounterContainer;
