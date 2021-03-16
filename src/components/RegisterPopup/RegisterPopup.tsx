import React from 'react';
import './RegisterPopup.css';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import { InputValues, ErrorValues } from './../../utils/interfaces';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onChangePopup: () => void;
  onRegister: (email: string, password: string, name: string) => void;
  isValid: boolean;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  values: InputValues;
  error: ErrorValues;
  errorFormText: string;
};

const RegisterPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onChangePopup,
  onRegister,
  error,
  values,
  isValid,
  handleChange,
  isLoading,
  errorFormText,
}) => {

  // колбек сабмита формы
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    onRegister(values.email!, values.password!, values.name!);
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
        type="email"
        name="email"
        className="popup__input"
        placeholder="Введите почту"
        required
        minLength={5}
        maxLength={30}
        value={values.email || ''} onChange={handleChange}
      />
      <span id="email-input-error" className="popup__input_error_active">{error.email || ''}</span>
      <span className="popup__input-text">Пароль</span>
      <input
        type="password"
        name="password"
        className="popup__input"
        placeholder="Введите пароль"
        required
        minLength={5}
        maxLength={20}
        onChange={handleChange}
        value={values.password || ''}
      />
      <span id="password-input-error" className="popup__input_error_active">{error.password}</span>
      <span className="popup__input-text">Имя</span>
      <input
        type="text"
        name="name"
        className="popup__input"
        placeholder="Введите своё имя"
        required
        minLength={5}
        maxLength={20}
        onChange={handleChange}
        value={values.name || ''}
      />
      <span id="name-input-error" className="popup__input_error_active">{error.name}</span>
      <span id="form-input-error" className="popup__form_error_active">{errorFormText}</span>
      <button className={submitButton} type="submit">{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={onChangePopup}>Войти</span>
      </p>
    </PopupWithForm>
  );
}

export default RegisterPopup;
