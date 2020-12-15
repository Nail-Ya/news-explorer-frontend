import React from 'react';
import './Header.css'
import Navigation from './../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';

const Header = props => {
  const {
    onLogin,
    onMobileHeader,
    loggedIn,
    onSignOut
  } = props;

  const path = useLocation().pathname;

  // значения className в зависимости от пути
  const headerClassName =
  `${
    path === '/main'
    ?
    'header'
    :
    'header header_theme_white'
  }`

  const headerLogoClassName =
  `${
    path === '/main'
    ?
    'header__logo'
    :
    'header__logo header__logo_theme_white'
  }`

  const headerBurgerMenuButtonClassName =
  `${
    path === '/main'
    ?
    'header__burger-menu-button'
    :
    'header__burger-menu-button header__burger-menu-button_theme_white'
  }`

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <Link to="/main" className={headerLogoClassName}>NewsExplorer</Link>
        <Navigation
          onLogin={onLogin}
          loggedIn={loggedIn}
          onSignOut={onSignOut}
        />
        <button className={headerBurgerMenuButtonClassName} onClick={onMobileHeader}></button>
      </div>
    </header>
  )
}

export default Header;
