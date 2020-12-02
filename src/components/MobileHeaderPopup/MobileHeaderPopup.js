import React from 'react';
import './MobileHeaderPopup.css'
import { Link } from 'react-router-dom';

const MobileHeaderPopup = props => {
  const {
    isOpen,
    onClose,
    onLogin,
  } = props;

  return (
    <div className={'popup-header ' + (isOpen && 'popup-header_opened')}>
      <div className="popup-header-container">
        <header className="header__mobile">
          <Link to="/main" className="header__logo header__logo_type_mobile">NewsExplorer</Link>
          <button className="header__close-button" onClick={onClose}></button>
        </header>
        <nav className="header-navigation header-navigation_type_mobile">
          <Link  to="/main" onClick={onClose} className="header-navigation__link header-navigation__link_type_mobile">Главная</Link>
          <Link to="/saved-news" onClick={onClose} className="header-navigation__link header-navigation__link_type_mobile">Сохранённые статьи</Link>
          <button className="header-navigation__button header-navigation__button_type_mobile" onClick={onLogin}>Авторизоваться</button>
        </nav>
      </div>
    </div>
  )
}

export default MobileHeaderPopup;
