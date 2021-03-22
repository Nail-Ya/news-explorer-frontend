import React from 'react';
import './MobileHeaderPopup.scss';
import { Link } from 'react-router-dom';
import { User } from '../../utils/types';
import { RootState } from './../../store/reducers/rootReducer';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import classnames from 'classnames';
import Icon from '../UI/Icon/Icon';
import Portal from './../Portal/Portal';
import {
  setIsLoginPopupOpenActionCreator,
  setIsMobileHeaderPopupOpenActionCreator
} from '../../store/actions/popupsActionCreators';

export type Props = {
  onSignOut: () => void;
};

const MobileHeaderPopup: React.FC<Props> = ({ onSignOut }) => {

  const currentUser: User = useSelector((state: RootState) => state.user.currentUser);
  const isLoggedIn: boolean = useSelector((state: RootState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const isMobileHeaderPopupOpen: boolean = useSelector((state: RootState) => state.popups.isMobileHeaderPopupOpen);

  const popupClassName: string = classnames('popup-header', {
    'popup-header_opened': isMobileHeaderPopupOpen
  });

  const switchToLoginPopup = (): void => {
    dispatch(setIsLoginPopupOpenActionCreator(true));
    dispatch(setIsMobileHeaderPopupOpenActionCreator(false));
  }

  const closePopup = (): void => {
    dispatch(setIsMobileHeaderPopupOpenActionCreator(false));
  }

  return (
    <Portal>
      <div className={popupClassName}>
        <div className="popup-header-container">
          <header className="header__mobile">
            <Link
              to="/main"
              onClick={closePopup}
              className="header__logo header__logo_type_mobile"
            >
              NewsExplorer
            </Link>
            <button
              className="header__close-button"
              onClick={closePopup}
            >
              <Icon
                className='header__close-button-icon'
                name='close-icon'
              />
            </button>
          </header>
          <nav className="header-navigation header-navigation_type_mobile">
            <Link
              to="/main"
              onClick={closePopup}
              className="header-navigation__link header-navigation__link_type_mobile"
            >
              Главная
            </Link>
            {
              isLoggedIn
              &&
              <Link
                to="/saved-news"
                onClick={closePopup}
                className="header-navigation__link header-navigation__link_type_mobile"
              >
                Сохранённые статьи
              </Link>
            }
            <button
              className="header-navigation__button header-navigation__button_type_mobile"
              onClick={isLoggedIn ? onSignOut : switchToLoginPopup}
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
