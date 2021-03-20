import React from 'react';
import './Header.scss';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '../UI/Icon/Icon';

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

  const iconName: string =
    `${path === '/main'
      ?
      'burger-icon-white'
      :
      'burger-icon-black'
    }`

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <Link to="/main" className={headerLogoClassName}>NewsExplorer</Link>
        <Navigation
          onLogin={onLogin}
          onSignOut={onSignOut}
        />
        <button
          onClick={onMobileHeader}
          className='header__burger-menu-button'
        >
          <Icon
            className='header__burger-menu-button-icon'
            name={iconName}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
