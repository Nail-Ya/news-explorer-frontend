import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import { setIsLoginPopupOpenActionCreator } from '../../store/actions/popupsActionCreators';
import { useDispatch } from 'react-redux';

export type Props = {
  component: any;
  getSavedArticles: () => Promise<any>;
};

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  getSavedArticles
}) => {

  const dispatch = useDispatch();
  const isLoggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  // открытие попапа авторизации
  React.useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setIsLoginPopupOpenActionCreator(true));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Route>
      {
        () => isLoggedIn ? <Component getSavedArticles={getSavedArticles} /> : <Redirect to="/main" />
      }
    </Route>
  );
}

export default ProtectedRoute;
