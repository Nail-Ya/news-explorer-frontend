import {
  User,
  UserAction,
} from '../../utils/types';
import {
  SET_CURRENT_USER,
  SET_IS_LOGGED_IN,
} from './actionTypes';

export function setCurrentUserActionCreator(currentUser: User): UserAction {
  return {
    type: SET_CURRENT_USER,
    currentUser
  };
};

export function setIsLoggedInActionCreator(isLoggedIn: boolean): UserAction {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn
  };
};
