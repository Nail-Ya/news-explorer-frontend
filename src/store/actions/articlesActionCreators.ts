import {
  Article,
  SavedArticle,
  ArticleAction
} from '../../utils/interfaces';
import {
  SET_ARTICLES,
  SET_ARTICLES_TO_DISPLAY,
  SET_MY_SAVED_ARTICLES,
} from './actionTypes';

export function setArticlesActionCreator(articles: Array<Article>): ArticleAction {
  return {
    type: SET_ARTICLES,
    articles
  };
};

export function setArticlesToDisplayActionCreator(articlesToDisplay: Array<Article>): ArticleAction {
  return {
    type: SET_ARTICLES_TO_DISPLAY,
    articlesToDisplay
  };
};

export function setMySavedArticlesActionCreator(mySavedArticles: Array<SavedArticle>): ArticleAction {
  return {
    type: SET_MY_SAVED_ARTICLES,
    mySavedArticles
  };
};
