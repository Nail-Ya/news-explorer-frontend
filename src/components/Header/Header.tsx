import React from 'react';
import './Header.scss';
import Navigation from '../Navigation/Navigation';
import {
  Link,
  useLocation
} from 'react-router-dom';
import classnames from 'classnames';
import Icon from '../UI/Icon/Icon';
import { useDispatch } from 'react-redux';
import { setIsMobileHeaderPopupOpenActionCreator } from '../../store/actions/popupsActionCreators';

export type Props = {
  onSignOut: () => void;
};

const Header: React.FC<Props> = ({ onSignOut }) => {

  const path: string = useLocation().pathname;
  const dispatch = useDispatch();

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

  const openMobilePopup = (): void => {
    dispatch(setIsMobileHeaderPopupOpenActionCreator(true));
  }

  return (
    <header className={headerClassName}>
      <div className="header__container">
        <Link to="/main" className={headerLogoClassName}>NewsExplorer</Link>
        <Navigation onSignOut={onSignOut} />
        <button
          onClick={openMobilePopup}
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
