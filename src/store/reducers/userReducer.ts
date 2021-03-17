import {
  UserState,
  UserAction
} from './../../utils/interfaces';
import {
  SET_CURRENT_USER,
  SET_IS_LOGGED_IN,
} from './../actions/actionTypes';

const initialState: UserState = {
  currentUser: {},
  isLoggedIn: false,
};

export default function userReducer(
  state: UserState = initialState,
  action: UserAction
): UserState {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser!
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn!
      };
    default:
      return state
  };
};
