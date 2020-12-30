import React from 'react';
import './App.css';
import Header from './../Header/Header';
import Main from './../Main/Main';
import Footer from './../Footer/Footer';
import SavedNews from './../SavedNews/SavedNews';
import LoginPopup from './../LoginPopup/LoginPopup';
import RegisterPopup from './../RegisterPopup/RegisterPopup';
import MobileHeaderPopup from './../MobileHeaderPopup/MobileHeaderPopup';
import SuccessPopup from './../SuccessPopup/SuccessPopup';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import NewsApi from './../../utils/NewsApi';
import * as mainApi from './../../utils/MainApi';
import { CurrentUserContext } from './../../context/CurrentUserContext';
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute';

function App() {

  const history = useHistory();

  // state попапов
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isMobileHeaderPopupOpen, setIsMobileHeaderPopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);

  // state статей
  const [articles, setArticles] = React.useState(JSON.parse(localStorage.getItem('articles')) || []); // state всех статей
  const [articlesToDisplay, setArticlesToDisplay] = React.useState(JSON.parse(localStorage.getItem('articlesToDisplay')) || []); // state первых 3 статей для показа пользователю
  const [keyword, setKeyword] = React.useState(''); // значение запроса
  const [mySavedArticles, setMySavedArticles] = React.useState([]); // state сохраненных пользователем карточек

  // state вспомогательных компонентов
  const [isNewsCardListShow, setIsNewsCardListShow] = React.useState(JSON.parse(localStorage.getItem('isNewsCardListShow')) || false); // показывать компонент NewsCardList
  const [isPreloaderShow, setIsPreloaderShow] = React.useState(false); // показывать компонент Preloader
  const [isNotFoundShow, setIsNotFoundShow] = React.useState(false); // показывать компонент NotFound

  // state ошибки в попапе регистрации пользователя
  const [errorFormText, setErrorFormText] = React.useState('');

  // state переменные для валидации формы
  const [values, setValues] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [error, setError] = React.useState({});

  //state с данными пользователя
  const [currentUser, setCurrenUser] = React.useState({});

  // state для отображения загрузки
  const [isLoading, setIsLoading] = React.useState(false);

  // state состояния пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  // state ошибки от сервера NewsApi
  const [errorNewsServer, setErrorNewsServer] = React.useState(false);

  // проверяем наличие токена в локальном хранилище
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setLoggedIn(true);
      getSavedArticles();
      setCurrenUser(JSON.parse(localStorage.getItem('user')));
      setArticles(JSON.parse(localStorage.getItem('articles')));
      localStorage.setItem('loggedIn', JSON.stringify(true));
    }
  },[loggedIn]);

  // функция валидации формы: отслеживает инпуты и отображает ошибку
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }

  // функция сбрасывает ошибки при закрытии попапа/сабмита формы
  function resetForm() {
    setValues({});
    setIsValid(false);
    setError({});
    setErrorFormText('');
  }

  // Колбек для открытия LoginPopup
  function handleLoginClick() {
    setIsLoginPopupOpen(true);
  }

  // Колбек для открытия MobileHeader
  function handleHeaderMobileClick() {
    setIsMobileHeaderPopupOpen(true);
  }

  // Закрыть все попапы
  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsMobileHeaderPopupOpen(false);
    setIsSuccessPopupOpen(false);
    resetForm();
  }

  // Функция для перехода по ссылке в попап регистрации
  function handleOpenRegisterPopup() {
    closeAllPopups();
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  // переход в попап логина
  function handleOpenLoginPopup() {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  }

  // Закрытие попапов при клике на Esc и на overlay
  React.useEffect(() => {
    // закрыть попап при клике на Esc
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    // закрыть попап при клике на overlay
    function closeByOverlay(evt) {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup-header_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    }
  });

  const newsApi = new NewsApi();

  // поиск новостей (функция передается в обработчик onSubmit формы поиска)
  const handleSearchArticles = (evt) => {

    evt.preventDefault();
    setIsNewsCardListShow(false);
    setIsPreloaderShow(true);
    setIsNotFoundShow(false);
    setArticles([]);
    setArticlesToDisplay([]);

    newsApi.getNews(keyword)
      .then((res) => {
        setIsPreloaderShow(false);
        setIsNewsCardListShow(true);

        // добавляем каждой статье keyword ключевое слово
        const newArray = res.articles.map((item) => {
          item.keyword = keyword
          return item;
        });
        setArticles(newArray)
        setArticlesToDisplay(newArray.slice(0, 3))

        // добавляем в локальное хранилище массив статей и значение запроса
        localStorage.setItem('articles', JSON.stringify(newArray));
        localStorage.setItem('articlesToDisplay', JSON.stringify(newArray.slice(0, 3)));
        localStorage.setItem('keyword', keyword);

        //если новостей не найдено, то показать компонент NotFound
        if (newArray.length === 0) {
          setIsNotFoundShow(true);
          setIsNewsCardListShow(false);
          localStorage.setItem('isNewsCardListShow', JSON.stringify(false));
        } else {
          setIsNotFoundShow(false);
          setIsNewsCardListShow(true);
          localStorage.setItem('isNewsCardListShow', JSON.stringify(true));
        }
      })
      .catch((err) => {
        console.log(`Ошибка при поиске новостей: ${err}`);
        setIsNotFoundShow(true);
        setIsPreloaderShow(false);
        setErrorNewsServer(true);
      });
  }

  // отслеживаем изменение инпута формы поиска новостей
  function handleRequestValueChange(evt) {
    setKeyword(evt.target.value)
  }

  // добавляем 3 статьи к показу по кнопке показать еще
  function addArticlesToDisplay() {
    setArticlesToDisplay([...articlesToDisplay, ...articles.slice(articlesToDisplay.length, articlesToDisplay.length + 3)]);
  }

  // регистрация пользователя
  function handleUserRegister(email, password, name) {
    setIsLoading(true);
    return mainApi.register(email, password, name)
      .then((res) => {
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
  }

  // Логин пользователя
  function handleLogin(email, password) {
    setIsLoading(true);
    return mainApi.authorize(email, password)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        closeAllPopups();
        mainApi.getUserInfo(data.token)
          .then((res) => {
            // записываем данные пользователя в локальное хранилище
            localStorage.setItem('user', JSON.stringify(res));
            setCurrenUser(res);
            setLoggedIn(true);
            history.push('/main');
          })
          .catch(err => console.log(`Ошибка при получении данных пользователя после входа в систему: ${err}`));
      })
      .catch((err) => {
        console.log(`Ошибка при входе пользователя в систему: ${err}`)
        setErrorFormText(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // выход пользователя из системы
  function handleSignOut() {
    setLoggedIn(false);
    setArticles([]);
    setArticlesToDisplay([]);
    setMySavedArticles([]);
    setIsNewsCardListShow(false);
    setIsMobileHeaderPopupOpen(false);

    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('articles');
    localStorage.removeItem('articlesToDisplay');
    localStorage.removeItem('requestValue');
    localStorage.removeItem('isNewsCardListShow');
    localStorage.removeItem('loggedIn');

    history.push('/main');
  }

  // запрос сохраненных карточек
  function getSavedArticles() {
    return mainApi.getSavedArticles()
      .then((res) => {
        if (res) {
          setMySavedArticles(res.data);
        } else {
          setMySavedArticles([]);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке сохраненных новостей: ${err}`);
      });
  }

  // сохранить статью
  function handleSaveArticle(article) {
    if (loggedIn) {
      return mainApi.saveArticle(article)
        .then((res) => {
          if (res) {
            getSavedArticles();
          }
        })
        .catch((err) => {
          console.log(`Ошибка при сохранении новости: ${err}`);
        });
    }
  }

  // удалить статью
  function handleDeleteArticle(article) {
    return mainApi.deleteArticle(article)
      .then((res) => {
        const mySavedArticlesArray = mySavedArticles.filter((item) => (item._id !== article._id));
        setMySavedArticles(mySavedArticlesArray);
      })
      .catch((err) => {
        console.log(`Ошибка при удалении новости: ${err}`);
      });
  }

  // колбек при нажатии кнопки на карточке
  function handleArticleClick(article) {
    if (!loggedIn) {
      return setIsLoginPopupOpen(true);
    }
    const savedArticle = mySavedArticles.find((item) => item.link === article.url || item.link === article.link);
    if (!savedArticle) {
      handleSaveArticle(article);
    } else {
      handleDeleteArticle(savedArticle);
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onLogin={handleLoginClick}
          onMobileHeader={handleHeaderMobileClick}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
        />
        <Switch>
          <Route path="/main">
            <Main
              articlesToDisplay={articlesToDisplay}
              onSearchArticles={handleSearchArticles}
              onChangeRequestValue={handleRequestValueChange}
              onAddArticlesToDisplay={addArticlesToDisplay}
              isNewsCardListShow={isNewsCardListShow}
              isPreloaderShow={isPreloaderShow}
              isNotFoundShow={isNotFoundShow}
              errorNewsServer={errorNewsServer}
              onArticleClick={handleArticleClick}
              mySavedArticles={mySavedArticles}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute exact
            path="/saved-news"
            component={SavedNews}
            handleLoginClick={handleLoginClick}
            onArticleClick={handleArticleClick}
            mySavedArticles={mySavedArticles}
            loggedIn={loggedIn}
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
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
          />
          <SuccessPopup
            isOpen={isSuccessPopupOpen}
            onClose={closeAllPopups}
            onLogin={handleOpenLoginPopup}
          />
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
