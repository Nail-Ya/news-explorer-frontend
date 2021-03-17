import React from 'react';
import './MobileHeaderPopup.css';
import { Link } from 'react-router-dom';
import { User } from './../../utils/interfaces';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignOut: () => void;
};

const MobileHeaderPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onLogin,
  onSignOut,
}) => {

  const currentUser: User = useSelector((state: RootState) => state.user.currentUser);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <div className={'popup-header ' + (isOpen && 'popup-header_opened')}>
      <div className="popup-header-container">
        <header className="header__mobile">
          <Link to="/main" className="header__logo header__logo_type_mobile">NewsExplorer</Link>
          <button className="header__close-button" onClick={onClose}></button>
        </header>
        <nav className="header-navigation header-navigation_type_mobile">
          <Link  to="/main" onClick={onClose} className="header-navigation__link header-navigation__link_type_mobile">Главная</Link>
          {
            isLoggedIn
            &&
            <Link to="/saved-news" onClick={onClose} className="header-navigation__link header-navigation__link_type_mobile">Сохранённые статьи</Link>
          }
          <button className="header-navigation__button header-navigation__button_type_mobile" onClick={isLoggedIn ? onSignOut : onLogin}>
          {
            isLoggedIn
            ?
            <>
              {currentUser.name}
              <span className="header-navigation__button-icon header-navigation__button-icon_theme_black"></span>
            </>
            :
            'Авторизоваться'
          }
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MobileHeaderPopup;
