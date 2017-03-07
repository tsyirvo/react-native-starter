import { DUMMY_ACTION, DUMMY_ACTION2 } from './constants';

const initialState = {
  toto: false,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY_ACTION:
      return {
        ...state,
        toto: !state.toto,
      };
    case DUMMY_ACTION2:
      return {
        ...state,
        toto: !state.toto,
      };
    default:
      return state;
  }
};

export default home;
