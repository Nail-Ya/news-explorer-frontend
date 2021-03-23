import {
  popupsAction,
} from '../../utils/types';
import {
  SET_IS_LOGIN_POPUP_OPEN,
  SET_IS_REGISTER_POPUP_OPEN,
  SET_IS_MOBILE_HEADER_POPUP_OPEN,
  SET_IS_SUCCESS_POPUP_OPEN
} from './actionTypes';

export function setIsLoginPopupOpenActionCreator(isLoginPopupOpen: boolean): popupsAction {
  return {
    type: SET_IS_LOGIN_POPUP_OPEN,
    isLoginPopupOpen
  };
};

export function setIsRegisterPopupOpenActionCreator(isRegisterPopupOpen: boolean): popupsAction {
  return {
    type: SET_IS_REGISTER_POPUP_OPEN,
    isRegisterPopupOpen
  };
};

export function setIsMobileHeaderPopupOpenActionCreator(isMobileHeaderPopupOpen: boolean): popupsAction {
  return {
    type: SET_IS_MOBILE_HEADER_POPUP_OPEN,
    isMobileHeaderPopupOpen
  };
};

export function setIsSuccessPopupOpenActionCreator(isSuccessPopupOpen: boolean): popupsAction {
  return {
    type: SET_IS_SUCCESS_POPUP_OPEN,
    isSuccessPopupOpen
  };
};
