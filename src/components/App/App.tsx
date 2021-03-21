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
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Article, SavedArticle, InputValues, ErrorValues, User, ServerResponseAtLogin, ServerResponseWhenRequestingSavedArticles } from '../../utils/interfaces';

import { RootState } from './../../store/reducers/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
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

function App() {

  const articles: Array<Article> = useSelector((state: RootState) => state.articles.articles);
  const articlesToDisplay: Array<Article> = useSelector((state: RootState) => state.articles.articlesToDisplay);
  const mySavedArticles: Array<SavedArticle> = useSelector((state: RootState) => state.articles.mySavedArticles);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const history = useHistory();
  // state попапов
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState<boolean>(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState<boolean>(false);
  const [isMobileHeaderPopupOpen, setIsMobileHeaderPopupOpen] = React.useState<boolean>(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState<boolean>(false);

  // state ошибки в попапе регистрации пользователя
  const [errorFormText, setErrorFormText] = React.useState<string>('');

  // state переменные для валидации формы
  const [values, setValues] = React.useState<InputValues>({});
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ErrorValues>({});

  // state для отображения загрузки
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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

  // функция валидации формы: отслеживает инпуты и отображает ошибку
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form')!.checkValidity());
  };

  // функция сбрасывает ошибки при закрытии попапа/сабмита формы
  function resetForm(): void {
    setValues({});
    setIsValid(false);
    setError({});
    setErrorFormText('');
  };

  // Колбек для открытия LoginPopup
  function handleLoginClick(): void {
    setIsLoginPopupOpen(true);
  };

  // Колбек для открытия MobileHeader
  function handleHeaderMobileClick(): void {
    setIsMobileHeaderPopupOpen(true);
  };

  // Закрыть все попапы
  function closeAllPopups(): void {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsMobileHeaderPopupOpen(false);
    setIsSuccessPopupOpen(false);
    resetForm();
  };

  // Функция для перехода по ссылке в попап регистрации
  function handleOpenRegisterPopup(): void {
    closeAllPopups();
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  // переход в попап логина
  function handleOpenLoginPopup(): void {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  };

  // добавляем 3 статьи к показу по кнопке показать еще
  function addArticlesToDisplay(): void {
    dispatch(setArticlesToDisplayActionCreator([
      ...articlesToDisplay,
      ...articles.slice(articlesToDisplay.length, articlesToDisplay.length + 3)
    ]));
  };

  // регистрация пользователя
  function handleUserRegister(email: string, password: string, name: string): Promise<any> {
    setIsLoading(true);
    return mainApi.register(email, password, name)
      .then(() => {
        closeAllPopups();
        setIsRegisterPopupOpen(false);
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации нового пользователя: ${err}`)
        setErrorFormText(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Логин пользователя
  function handleLogin(email: string, password: string): Promise<any> {
    setIsLoading(true);
    return mainApi.authorize(email, password)
      .then((data: ServerResponseAtLogin) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        closeAllPopups();
        mainApi.getUserInfo(data.token)
          .then((res: User) => {
            // записываем данные пользователя в локальное хранилище
            localStorage.setItem('user', JSON.stringify(res));
            dispatch(setCurrentUserActionCreator(res));
            dispatch(setIsLoggedInActionCreator(true));
            history.push('/main');
          })
          .catch((err) => console.log(`Ошибка при получении данных пользователя после входа в систему: ${err}`));
      })
      .catch((err) => {
        console.log(`Ошибка при входе пользователя в систему: ${err}`)
        setErrorFormText(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // выход пользователя из системы
  function handleSignOut(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('articles');
    localStorage.removeItem('articlesToDisplay');
    localStorage.removeItem('requestValue');
    localStorage.removeItem('isNewsCardListShow');
    localStorage.removeItem('loggedIn');

    history.push('/main');

    dispatch(setIsLoggedInActionCreator(false));
    dispatch(setArticlesActionCreator([]));
    dispatch(setArticlesToDisplayActionCreator([]));
    dispatch(setMySavedArticlesActionCreator([]));
    dispatch(setIsNewsCardListShowActionCreator(false));
    setIsMobileHeaderPopupOpen(false);
  };

  // запрос сохраненных карточек
  function getSavedArticles(): Promise<any> {
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

  // сохранить статью
  function handleSaveArticle(article: Article): Promise<any> | void {
    if (isLoggedIn) {
      return mainApi.saveArticle(article)
        .then((res) => {
          if (res) {
            getSavedArticles();
          }
        })
        .catch((err) => {
          console.log(`Ошибка при сохранении новости: ${err}`);
        });
    };
  };

  // удалить статью
  function handleDeleteArticle(article: SavedArticle): Promise<any> {
    return mainApi.deleteArticle(article)
      .then((res) => {
        const mySavedArticlesArray: Array<SavedArticle> = mySavedArticles.filter((item: SavedArticle) => (item._id !== article._id));
        dispatch(setMySavedArticlesActionCreator(mySavedArticlesArray));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении новости: ${err}`);
      });
  };

  // колбек при нажатии кнопки на карточке
  function handleArticleClick(article: any): void {
    if (!isLoggedIn) {
      return setIsLoginPopupOpen(true);
    };
    const savedArticle: any = mySavedArticles.find((item: SavedArticle) => item.link === article.url || item.link === article.link);
    if (!savedArticle) {
      handleSaveArticle(article);
    } else {
      handleDeleteArticle(savedArticle);
    };
  };

  return (
    <div className="page">
      <Header
        onLogin={handleLoginClick}
        onMobileHeader={handleHeaderMobileClick}
        onSignOut={handleSignOut}
      />
      <Switch>
        <Route path="/main">
          <Main
            onAddArticlesToDisplay={addArticlesToDisplay}
            onArticleClick={handleArticleClick}
          />
        </Route>
        <ProtectedRoute
          path="/saved-news"
          component={SavedNews}
          handleLoginClick={handleLoginClick}
          onArticleClick={handleArticleClick}
        />
        <Redirect from='/' to='/main' />
      </Switch>
      <Footer />
      <section className="popups">
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleOpenRegisterPopup}
          onLogin={handleLogin}
          error={error}
          values={values}
          isValid={isValid}
          handleChange={handleChange}
          errorFormText={errorFormText}
          isLoading={isLoading}
        />
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleOpenLoginPopup}
          onRegister={handleUserRegister}
          error={error}
          values={values}
          isValid={isValid}
          handleChange={handleChange}
          errorFormText={errorFormText}
          isLoading={isLoading}
        />
        <MobileHeaderPopup
          isOpen={isMobileHeaderPopupOpen}
          onClose={closeAllPopups}
          onLogin={handleOpenLoginPopup}
          onSignOut={handleSignOut}
        />
        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          onLogin={handleOpenLoginPopup}
        />
      </section>
    </div>
  );
}

export default App;
