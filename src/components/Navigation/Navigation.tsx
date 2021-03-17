import React from 'react';
import './Navigation.css';
import { NavLink, useLocation } from 'react-router-dom';
import { User } from './../../utils/interfaces';
import { RootState } from './../../store/reducers/rootReducer';
import { useSelector } from 'react-redux';

export type Props = {
  onLogin: () => void;
  onSignOut: () => void;
};

const Navigation: React.FC<Props> = ({
  onLogin,
  onSignOut,
}) => {

  const path: string = useLocation().pathname;
  const currentUser: User = useSelector((state: RootState) => state.user.currentUser);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);

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
        isLoggedIn
        &&
        <NavLink to="/saved-news" className={headerNavigationLinkClassName} activeClassName={headerNavigationActiveLinkClassName}>Сохранённые статьи</NavLink>
      }
      <button onClick={isLoggedIn ? onSignOut : onLogin} className={headerNavigationButtonClassName}>
      {
        isLoggedIn
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
