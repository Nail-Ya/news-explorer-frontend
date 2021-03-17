import {
  ArticleState,
  ArticleAction,
} from '../../utils/interfaces';
import {
  SET_ARTICLES,
  SET_ARTICLES_TO_DISPLAY,
  SET_MY_SAVED_ARTICLES,
} from '../actions/actionTypes';

const initialState: ArticleState = {
  articles: JSON.parse(localStorage.getItem('articles') || '[]'),
  articlesToDisplay: JSON.parse(localStorage.getItem('articlesToDisplay') || '[]'),
  mySavedArticles: [],
};

export default function articlesReducer(
  state: ArticleState = initialState,
  action: ArticleAction
): ArticleState {
  switch(action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles!
      };
    case SET_ARTICLES_TO_DISPLAY:
      return {
        ...state,
        articlesToDisplay: action.articlesToDisplay!
      };
    case SET_MY_SAVED_ARTICLES:
      return {
        ...state,
        mySavedArticles: action.mySavedArticles!
      };
    default:
      return state;
  };
};
