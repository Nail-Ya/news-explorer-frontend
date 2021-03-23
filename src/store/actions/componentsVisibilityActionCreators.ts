import {
  componentsVisibilityAction,
} from '../../utils/types';
import {
  SET_IS_PRELOADER_SHOW,
  SET_IS_NOT_FOUND_SHOW,
  SET_IS_ERROR_NEWS_SERVER,
  SET_IS_NEWS_CARD_LIST_SHOW,
} from './actionTypes';

export function setIsPreloaderShowActionCreator(isPreloaderShow: boolean): componentsVisibilityAction {
  return {
    type: SET_IS_PRELOADER_SHOW,
    isPreloaderShow
  };
};

export function setIsNotFoundShowActionCreator(isNotFoundShow: boolean): componentsVisibilityAction {
  return {
    type: SET_IS_NOT_FOUND_SHOW,
    isNotFoundShow
  };
};

export function setIsErrorNewsServerActionCreator(isErrorNewsServer: boolean): componentsVisibilityAction {
  return {
    type: SET_IS_ERROR_NEWS_SERVER,
    isErrorNewsServer
  };
};

export function setIsNewsCardListShowActionCreator(isNewsCardListShow: boolean): componentsVisibilityAction {
  return {
    type: SET_IS_NEWS_CARD_LIST_SHOW,
    isNewsCardListShow
  };
};
