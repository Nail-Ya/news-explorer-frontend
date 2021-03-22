import React from 'react';
import './App.scss';
import Header from '../Header/Header';
import Main from '../../containers/Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../../containers/SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import MobileHeaderPopup from '../MobileHeaderPopup/MobileHeaderPopup';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { ServerResponseWhenRequestingSavedArticles } from '../../utils/types';
import { RootState } from './../../store/reducers/rootReducer';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  setArticlesActionCreator,
  setArticlesToDisplayActionCreator,
  setMySavedArticlesActionCreator
} from '../../store/actions/articlesActionCreators';
import {
  setCurrentUserActionCreator,
  setIsLoggedInActionCreator,
} from '../../store/actions/userActionCreators';
import { setIsNewsCardListShowActionCreator } from '../../store/actions/componentsVisibilityActionCreators';
import { setIsMobileHeaderPopupOpenActionCreator } from '../../store/actions/popupsActionCreators';

function App() {

  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  // запрос сохраненных карточек
  const getSavedArticles = (): Promise<any> => {
    return mainApi.getSavedArticles()
      .then((res: ServerResponseWhenRequestingSavedArticles) => {
        if (res) {
          dispatch(setMySavedArticlesActionCreator(res.data));
        } else {
          dispatch(setMySavedArticlesActionCreator([]));
        }
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке сохраненных новостей: ${err}`);
      });
  };

  // проверяем наличие токена в локальном хранилище
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(setIsLoggedInActionCreator(true));
      getSavedArticles();
      dispatch(setCurrentUserActionCreator(JSON.parse(localStorage.getItem('user') || '')));
      dispatch(setArticlesActionCreator(JSON.parse(localStorage.getItem('articles') || '[]')));
      localStorage.setItem('loggedIn', JSON.stringify(true));
    }
    // eslint-disable-next-line
  }, [isLoggedIn, dispatch]);

  // выход пользователя из системы
  const handleSignOut = (): void => {
    localStorage.clear();
    history.push('/main');
    dispatch(setIsLoggedInActionCreator(false));
    dispatch(setArticlesActionCreator([]));
    dispatch(setArticlesToDisplayActionCreator([]));
    dispatch(setMySavedArticlesActionCreator([]));
    dispatch(setIsNewsCardListShowActionCreator(false));
    dispatch(setIsMobileHeaderPopupOpenActionCreator(false));
  };

  return (
    <div className="page">
      <Header onSignOut={handleSignOut} />
      <Switch>
        <Route path="/main">
          <Main getSavedArticles={getSavedArticles} />
        </Route>
        <ProtectedRoute
          component={SavedNews}
          getSavedArticles={getSavedArticles}
        />
        <Redirect from='/' to='/main' />
      </Switch>
      <Footer />
      <LoginPopup />
      <RegisterPopup />
      <MobileHeaderPopup onSignOut={handleSignOut} />
      <SuccessPopup />
    </div>
  );
}

export default App;
