import { DUMMY_ACTION } from './constants';

const initialState = {
  toto: false
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY_ACTION:
      return {
        ...state,
        toto: !state.toto
      };
    default:
      return state;
  }
};

export default home;
