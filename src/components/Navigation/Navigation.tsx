import React from 'react';
import './Navigation.scss';
import {
  NavLink,
  useLocation
} from 'react-router-dom';
import { User } from '../../utils/types';
import { RootState } from './../../store/reducers/rootReducer';
import classnames from 'classnames';
import Icon from '../UI/Icon/Icon';
import { setIsLoginPopupOpenActionCreator } from '../../store/actions/popupsActionCreators';
import {
  useSelector,
  useDispatch
} from 'react-redux';

export type Props = {
  onSignOut: () => void;
};

const Navigation: React.FC<Props> = ({
  onSignOut,
}) => {

  const path: string = useLocation().pathname;
  const currentUser: User = useSelector((state: RootState) => state.user.currentUser);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const headerNavigationLinkClassName: string = classnames('header-navigation__link', {
    'header-navigation__link_theme_white': path === '/saved-news'
  });

  const headerNavigationActiveLinkClassName: string = classnames({
    'header-navigation__link_active_black': path === '/main',
    'header-navigation__link_active_white': path === '/saved-news'
  });

  const headerNavigationButtonClassName: string = classnames('header-navigation__button', {
    'header-navigation__button_theme_white': path === '/saved-news'
  });

  const headerNavigationButtonIconName: string =
  `${
    path === '/main'
    ?
    'signout-icon-white'
    :
    'signout-icon-black'
  }`

  const handleOpenLogin = (): void => {
    dispatch(setIsLoginPopupOpenActionCreator(true));
  };

  return (
    <nav className="header-navigation">
      <NavLink to="/main" className={headerNavigationLinkClassName} activeClassName={headerNavigationActiveLinkClassName}>Главная</NavLink>
      {
        isLoggedIn
        &&
        <NavLink to="/saved-news" className={headerNavigationLinkClassName} activeClassName={headerNavigationActiveLinkClassName}>Сохранённые статьи</NavLink>
      }
      <button
        onClick={isLoggedIn ? onSignOut : handleOpenLogin}
        className={headerNavigationButtonClassName}
      >
        {
          isLoggedIn
          ?
          <>
            {currentUser.name}
            <Icon
              className='header-navigation__button-icon'
              name={headerNavigationButtonIconName}
            />
          </>
          :
          'Авторизоваться'
        }
      </button>
    </nav>
  );
}

export default Navigation;
