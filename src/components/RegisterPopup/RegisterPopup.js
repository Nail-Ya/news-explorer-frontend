import React from 'react';
import './RegisterPopup.css'
import PopupWithForm from './../PopupWithForm/PopupWithForm';

const RegisterPopup = props => {
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
      <span className="popup__input-text">Имя</span>
      <input id="name-input" type="text" className="popup__input" placeholder="Введите своё имя" required minlength="5" maxlength="20" />
      <span id="name-input-error" className="popup__input_error_active">Ошибка</span>
      <span id="form-input-error" className="popup__form_error_active">Ошибка</span>
      <button className="popup__button" type="submit">Зарегистрироваться</button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={onChangePopup}>Войти</span>
      </p>
    </PopupWithForm>
  )
}

export default RegisterPopup;
