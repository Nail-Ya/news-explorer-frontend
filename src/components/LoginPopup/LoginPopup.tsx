import React from 'react';
import './LoginPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import { InputValues, ErrorValues } from './../../utils/interfaces';
import classnames from 'classnames';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onChangePopup: () => void;
  onLogin: (email: string, password: string) => void;
  isValid: boolean;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  values: InputValues;
  error: ErrorValues;
  errorFormText: string;
};

const LoginPopup: React.FC<Props> = ({
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
}) => {

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>): void {
    evt.preventDefault();
    onLogin(values.emailLogin!, values.passwordLogin!);
  }

  const submitButtonClassName: string = classnames('popup__button', {
    'popup__button_disabled': !isValid
  });

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
        minLength={5}
        maxLength={30}
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
        minLength={5}
        maxLength={30}
        onChange={handleChange}
        value={values.passwordLogin || ''}
      />
      <span id="password-input-error" className="popup__input_error_active">{error.passwordLogin || ''}</span>
      <span id="form-input-error" className="popup__form_error_active">{errorFormText}</span>
      <button className={submitButtonClassName} type="submit">{isLoading ? 'Загрузка...' : 'Войти'}</button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={onChangePopup}>Зарегистрироваться</span>
      </p>
    </PopupWithForm>
  );
}

export default LoginPopup;
