import React from 'react';
import './SuccessPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {
  setIsLoginPopupOpenActionCreator,
  setIsSuccessPopupOpenActionCreator
} from '../../store/actions/popupsActionCreators';

const SuccessPopup: React.FC = () => {

  const dispatch = useDispatch();
  const isSuccessPopupOpen: boolean = useSelector((state: RootState) => state.popups.isSuccessPopupOpen);

  const switchToLoginPopup = (): void => {
    dispatch(setIsSuccessPopupOpenActionCreator(false));
    dispatch(setIsLoginPopupOpenActionCreator(true));
  };

  return (
    <PopupWithForm
      isOpen={isSuccessPopupOpen}
      onClose={() => dispatch(setIsSuccessPopupOpenActionCreator(false))}
    >
      <p className="popup__title">Пользователь успешно зарегистрирован!</p>
      <span className="popup__link popup__link_type_success" onClick={switchToLoginPopup}>Войти</span>
    </PopupWithForm>
  );
}

export default SuccessPopup;
