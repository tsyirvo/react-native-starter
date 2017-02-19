import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
  rehydrated: false
};

const router = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene
      };
    case 'persist/REHYDRATE':
      return {
        rehydrated: true
      };
    default:
      return state;
  }
};

export default router;
