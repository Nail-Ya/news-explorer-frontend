import {
  popupsState,
  popupsAction,
} from '../../utils/types';
import {
  SET_IS_LOGIN_POPUP_OPEN,
  SET_IS_REGISTER_POPUP_OPEN,
  SET_IS_MOBILE_HEADER_POPUP_OPEN,
  SET_IS_SUCCESS_POPUP_OPEN
} from './../actions/actionTypes';

const initialState: popupsState = {
  isLoginPopupOpen: false,
  isRegisterPopupOpen: false,
  isMobileHeaderPopupOpen: false,
  isSuccessPopupOpen: false
};

export default function popupsReducer(
  state: popupsState = initialState,
  action: popupsAction
): popupsState {
  switch(action.type) {
    case SET_IS_LOGIN_POPUP_OPEN:
      return {
        ...state,
        isLoginPopupOpen: action.isLoginPopupOpen!
      };
    case SET_IS_REGISTER_POPUP_OPEN:
      return {
        ...state,
        isRegisterPopupOpen: action.isRegisterPopupOpen!
      };
    case SET_IS_MOBILE_HEADER_POPUP_OPEN:
      return {
        ...state,
        isMobileHeaderPopupOpen: action.isMobileHeaderPopupOpen!
      };
    case SET_IS_SUCCESS_POPUP_OPEN:
      return {
        ...state,
        isSuccessPopupOpen: action.isSuccessPopupOpen!
      };
    default:
      return state
  };
};
