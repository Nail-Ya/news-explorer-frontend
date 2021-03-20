import React from 'react';
import './MobileHeaderPopup.scss';
import { Link } from 'react-router-dom';
import { User } from './../../utils/interfaces';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import Icon from '../UI/Icon/Icon';
import Portal from './../Portal/Portal';

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

  const popupClassName: string = classnames('popup-header', {
    'popup-header_opened': isOpen
  });

  return (
    <Portal>
      <div className={popupClassName}>
        <div className="popup-header-container">
          <header className="header__mobile">
            <Link to="/main" className="header__logo header__logo_type_mobile">NewsExplorer</Link>
            <button
              className="header__close-button"
              onClick={onClose}
            >
              <Icon
                className='header__close-button-icon'
                name='close-icon'
              />
            </button>
          </header>
          <nav className="header-navigation header-navigation_type_mobile">
            <Link to="/main" onClick={onClose} className="header-navigation__link header-navigation__link_type_mobile">Главная</Link>
            {
              isLoggedIn
              &&
              <Link to="/saved-news" onClick={onClose} className="header-navigation__link header-navigation__link_type_mobile">Сохранённые статьи</Link>
            }
            <button
              className="header-navigation__button header-navigation__button_type_mobile"
              onClick={isLoggedIn ? onSignOut : onLogin}
            >
              {
                isLoggedIn
                ?
                <>
                  {currentUser.name}
                  <Icon
                    className='header-navigation__button-icon'
                    name='signout-icon-white'
                  />
                </>
                :
                'Авторизоваться'
              }
            </button>
          </nav>
        </div>
      </div>
    </Portal>
  );
}

export default MobileHeaderPopup;
