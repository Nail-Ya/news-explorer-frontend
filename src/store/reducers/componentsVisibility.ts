import {
  componentsVisibilityState,
  componentsVisibilityAction,
} from './../../utils/interfaces';
import {
  SET_IS_PRELOADER_SHOW,
  SET_IS_NOT_FOUND_SHOW,
  SET_IS_ERROR_NEWS_SERVER,
  SET_IS_NEWS_CARD_LIST_SHOW,
} from './../actions/actionTypes';

const initialState: componentsVisibilityState = {
  isPreloaderShow: false,
  isNotFoundShow: false,
  isErrorNewsServer: false,
  isNewsCardListShow: JSON.parse(localStorage.getItem('isNewsCardListShow') || 'false')
};

export default function componentsVisibilityReducer(
  state: componentsVisibilityState = initialState,
  action: componentsVisibilityAction
): componentsVisibilityState {
  switch(action.type) {
    case SET_IS_PRELOADER_SHOW:
      return {
        ...state,
        isPreloaderShow: action.isPreloaderShow!
      };
    case SET_IS_NOT_FOUND_SHOW:
      return {
        ...state,
        isNotFoundShow: action.isNotFoundShow!
      };
    case SET_IS_ERROR_NEWS_SERVER:
      return {
        ...state,
        isErrorNewsServer: action.isErrorNewsServer!
      };
    case SET_IS_NEWS_CARD_LIST_SHOW:
      return {
        ...state,
        isNewsCardListShow: action.isNewsCardListShow!
      };
    default:
      return state
  };
};
