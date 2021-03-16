import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { SavedArticle } from '../../utils/interfaces';

export type Props = {
  component: any;
  handleLoginClick: () => void;
  path: string;
  onArticleClick: (article: SavedArticle) => void;
  mySavedArticles: Array<SavedArticle>;
  loggedIn: boolean;
};

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  handleLoginClick,
  path,
  onArticleClick,
  mySavedArticles,
  loggedIn,
}) => {

  const isloggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  // открытие попапа авторизации
  React.useEffect(() => {
    if (!isloggedIn) {
      handleLoginClick();
    }
  }, [isloggedIn, handleLoginClick]);

  return (
    <Route>
      {
        () => isloggedIn ? <Component handleLoginClick={handleLoginClick} path={path} onArticleClick={onArticleClick} mySavedArticles={mySavedArticles} loggedIn={loggedIn} /> : <Redirect to="/main" />
      }
    </Route>
  );
}

export default ProtectedRoute;
