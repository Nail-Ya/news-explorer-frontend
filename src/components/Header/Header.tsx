import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

export type Props = {
  onLogin: () => void;
  onMobileHeader: () => void;
  onSignOut: () => void;
};

const Header: React.FC<Props> = ({
  onLogin,
  onMobileHeader,
  onSignOut
}) => {

  const path: string = useLocation().pathname;

  const headerClassName: string = classnames('header', {
    'header_theme_white': path === '/saved-news'
  });

  const headerLogoClassName: string = classnames('header__logo', {
    'header__logo_theme_white': path === '/saved-news'
  });

  const headerBurgerMenuButtonClassName: string = classnames('header__burger-menu-button', {
    'header__burger-menu-button_theme_white': path === '/saved-news'
  });

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <Link to="/main" className={headerLogoClassName}>NewsExplorer</Link>
        <Navigation
          onLogin={onLogin}
          onSignOut={onSignOut}
        />
        <button className={headerBurgerMenuButtonClassName} onClick={onMobileHeader}></button>
      </div>
    </header>
  );
}

export default Header;
