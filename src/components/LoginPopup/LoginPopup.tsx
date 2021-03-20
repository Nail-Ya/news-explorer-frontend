import React from 'react';
import './LoginPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import { InputValues, ErrorValues } from './../../utils/interfaces';
import classnames from 'classnames';
import Button from './../UI/Button/Button';
import { Input } from '../UI/Input/Input';

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
      <Input
        type="email"
        name="emailLogin"
        placeholder="Введите почту"
        required={true}
        minLength={5}
        maxLength={30}
        onChange={handleChange}
        value={values.emailLogin || ''}
        errorText={error.emailLogin!}
      />
      <span className="popup__input-text">Пароль</span>
      <Input
        type="password"
        name="passwordLogin"
        placeholder="Введите пароль"
        required={true}
        minLength={5}
        maxLength={30}
        onChange={handleChange}
        value={values.passwordLogin || ''}
        errorText={error.passwordLogin!}
      />
      <span id="form-input-error" className="popup__form_error_active">{errorFormText}</span>
      <Button
        className={submitButtonClassName}
        type='submit'
      >
        {isLoading ? 'Загрузка...' : 'Войти'}
      </Button>
      <p className="popup__text">
        или&nbsp;
          <span className="popup__link" onClick={onChangePopup}>Зарегистрироваться</span>
      </p>
    </PopupWithForm>
  );
}

export default LoginPopup;
