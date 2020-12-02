import React from 'react';
import './App.css';
import Header from './../Header/Header';
import Main from './../Main/Main';
import Footer from './../Footer/Footer';
import SavedNews from './../SavedNews/SavedNews';
import LoginPopup from './../LoginPopup/LoginPopup';
import RegisterPopup from './../RegisterPopup/RegisterPopup';
import MobileHeaderPopup from './../MobileHeaderPopup/MobileHeaderPopup';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {

  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isMobileHeaderPopupOpen, setIsMobileHeaderPopupOpen] = React.useState(false);

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
  }

  // Функция для перехода по ссылке от одного попапа на другой
  function handleTogglePopup() {
    setIsLoginPopupOpen(!isLoginPopupOpen);
    setIsRegisterPopupOpen(!isRegisterPopupOpen);
  };

  function handleOpenLoginPopup() {
    setIsMobileHeaderPopupOpen(false);
    setIsLoginPopupOpen(true);
  }

  // Закрытие попапов при клике на Esc и на overlay
  React.useEffect(() => {
    // закрыть попап при клике на Esc
    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    // закрыть попап при клике на overlay
    function closeByOverlay(event) {
      if (event.target.classList.contains('popup_opened')) {
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

  return (
    <div className="page">
      <Switch>
        <Route path="/main">
          <Header
            onLogin={handleLoginClick}
            onMobileHeader={handleHeaderMobileClick}
          />
          <Main />
          <Footer />
        </Route>
        <Route path="/saved-news">
          <Header
            onLogin={handleLoginClick}
            onMobileHeader={handleHeaderMobileClick}
          />
          <SavedNews />
          <Footer />
        </Route>
        <Redirect from='/' to='/main' />
      </Switch>


      <section className="popups">
        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleTogglePopup}
        />

        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleTogglePopup}
        />

        <MobileHeaderPopup
          isOpen={isMobileHeaderPopupOpen}
          onClose={closeAllPopups}
          onLogin={handleOpenLoginPopup}
        />
      </section>
    </div>
  );
}

export default App;
