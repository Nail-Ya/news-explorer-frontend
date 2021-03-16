import React from 'react';
import './Navigation.css';
import { NavLink, useLocation } from 'react-router-dom';
import { CurrentUserContext } from './../../context/CurrentUserContext';
import { User } from './../../utils/interfaces';

export type Props = {
  onLogin: () => void;
  loggedIn: boolean;
  onSignOut: () => void;
};

const Navigation: React.FC<Props> = ({
  onLogin,
  onSignOut,
  loggedIn,
}) => {

  const path: string = useLocation().pathname;
  const currentUser: User = React.useContext(CurrentUserContext);

  // значения className в зависимости от пути
  const headerNavigationLinkClassName =
  `${
    path === '/main'
    ?
    'header-navigation__link'
    :
    'header-navigation__link header-navigation__link_theme_white'
  }`

  const headerNavigationActiveLinkClassName =
  `${
    path === '/main'
    ?
    'header-navigation__link header-navigation__link_active_black'
    :
    'header-navigation__link header-navigation__link_active_white header-navigation__link_theme_white'
  }`

  const headerNavigationButtonClassName =
  `${
    path === '/main'
    ?
    'header-navigation__button'
    :
    'header-navigation__button header-navigation__button_theme_white'
  }`

  const headerNavigationButtonIconClassName =
  `${
    path === '/main'
    ?
    'header-navigation__button-icon header-navigation__button-icon_theme_black'
    :
    'header-navigation__button-icon header-navigation__button-icon_theme_white'
  }`

  return (
    <nav className="header-navigation">
      <NavLink to="/main" className={headerNavigationLinkClassName} activeClassName={headerNavigationActiveLinkClassName}>Главная</NavLink>
      {
        loggedIn
        &&
        <NavLink to="/saved-news" className={headerNavigationLinkClassName} activeClassName={headerNavigationActiveLinkClassName}>Сохранённые статьи</NavLink>
      }
      <button onClick={loggedIn ? onSignOut : onLogin} className={headerNavigationButtonClassName}>
      {
        loggedIn
        ?
        <>
          {currentUser.name}
          <span className={headerNavigationButtonIconClassName}></span>
        </>
        :
        'Авторизоваться'
      }
      </button>
    </nav>
  );
}

export default Navigation;
