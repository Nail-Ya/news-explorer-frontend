import React from 'react';
import './LoginPopup.css'
import PopupWithForm from './../PopupWithForm/PopupWithForm';

const LoginPopup = props => {
  const {
    isOpen,
    onClose,
    onChangePopup,
  } = props;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
    >
      <p className="popup__title">Вход</p>
      <span className="popup__input-text">Email</span>
      <input id="email-input" type="email" className="popup__input" placeholder="Введите почту" required minlength="5" maxlength="30" />
      <span id="email-input-error" className="popup__input_error_active">Ошибка</span>
      <span className="popup__input-text">Пароль</span>
      <input id="password-input" type="text" className="popup__input" placeholder="Введите пароль" required minlength="5" maxlength="20" />
      <span id="password-input-error" className="popup__input_error_active">Ошибка</span>
      <button className="popup__button popup__button_disabled" type="submit">Войти</button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={onChangePopup}>Зарегистрироваться</span>
      </p>
    </PopupWithForm>
  )
}

export default LoginPopup;
