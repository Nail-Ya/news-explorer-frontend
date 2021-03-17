import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { SavedArticle } from '../../utils/interfaces';

export type Props = {
  component: any;
  handleLoginClick: () => void;
  path: string;
  onArticleClick: (article: SavedArticle) => void;
};

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  handleLoginClick,
  path,
  onArticleClick,
}) => {

  const isLoggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  // открытие попапа авторизации
  React.useEffect(() => {
    if (!isLoggedIn) {
      handleLoginClick();
    }
  }, [isLoggedIn, handleLoginClick]);

  return (
    <Route>
      {
        () => isLoggedIn ? <Component handleLoginClick={handleLoginClick} path={path} onArticleClick={onArticleClick} /> : <Redirect to="/main" />
      }
    </Route>
  );
}

export default ProtectedRoute;
