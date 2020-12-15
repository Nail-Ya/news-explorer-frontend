import React from 'react';
import './LoginPopup.css'
import PopupWithForm from './../PopupWithForm/PopupWithForm';

const LoginPopup = props => {
  const {
    isOpen,
    onClose,
    onChangePopup,
    onLogin,
    isValid,
    handleChange,
    isLoading,
    values,
    error,
    errorFormText,
  } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values.emailLogin, values.passwordLogin);
  }

  // отключение кнопки
  const submitButton = `${
    isValid ? 'popup__button' : 'popup__button popup__button_disabled'
  }`;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="popup__title">Вход</p>
      <span className="popup__input-text">Email</span>
      <input
        id="email-input"
        type="email"
        name="emailLogin"
        className="popup__input"
        placeholder="Введите почту"
        required
        minLength="5"
        maxLength="30"
        onChange={handleChange}
        value={values.emailLogin || ''}
      />
      <span id="email-input-error" className="popup__input_error_active">{error.emailLogin || ''}</span>
      <span className="popup__input-text">Пароль</span>
      <input
        id="password-input"
        type="password"
        name="passwordLogin"
        className="popup__input"
        placeholder="Введите пароль"
        required
        minLength="5"
        maxLength="20"
        onChange={handleChange}
        value={values.passwordLogin || ''}
      />
      <span id="password-input-error" className="popup__input_error_active">{error.passwordLogin || ''}</span>
      <span id="form-input-error" className="popup__form_error_active">{errorFormText}</span>
      <button className={submitButton} type="submit">{isLoading ? 'Загрузка...' : 'Войти'}</button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={onChangePopup}>Зарегистрироваться</span>
      </p>
    </PopupWithForm>
  )
}

export default LoginPopup;
