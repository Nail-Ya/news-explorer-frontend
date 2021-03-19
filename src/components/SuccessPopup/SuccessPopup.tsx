import React from 'react';
import './SuccessPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
};

const SuccessPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onLogin,
}) => {

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="popup__title">Пользователь успешно зарегистрирован!</p>
      <span className="popup__link popup__link_type_success" onClick={onLogin}>Войти</span>
    </PopupWithForm>
  );
}

export default SuccessPopup;
