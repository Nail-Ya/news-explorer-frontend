import React from 'react';
import './SuccessPopup.css'
import PopupWithForm from './../PopupWithForm/PopupWithForm';

const SuccessPopup = props => {
  const {
    isOpen,
    onClose,
    onLogin,
  } = props;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="popup__title">Пользователь успешно зарегистрирован!</p>
      <span className="popup__link popup__link_type_success" onClick={onLogin}>Войти</span>
    </PopupWithForm>
  )
}

export default SuccessPopup;