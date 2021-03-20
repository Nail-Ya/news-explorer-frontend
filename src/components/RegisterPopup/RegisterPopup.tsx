import React from 'react';
import './RegisterPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import { InputValues, ErrorValues } from './../../utils/interfaces';
import classnames from 'classnames';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';

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
        name="email"
        placeholder="Введите почту"
        required={true}
        minLength={5}
        maxLength={30}
        onChange={handleChange}
        value={values.email || ''}
        errorText={error.email!}
      />
      <span className="popup__input-text">Пароль</span>
      <Input
        type="password"
        name="password"
        placeholder="Введите пароль"
        required={true}
        minLength={5}
        maxLength={20}
        onChange={handleChange}
        value={values.password || ''}
        errorText={error.password!}
      />
      <span className="popup__input-text">Имя</span>
      <Input
        type="text"
        name="name"
        placeholder="Введите своё имя"
        required={true}
        minLength={5}
        maxLength={20}
        onChange={handleChange}
        value={values.name || ''}
        errorText={error.name!}
      />
      <span id="form-input-error" className="popup__form_error_active">{errorFormText}</span>
      <Button className={submitButtonClassName} type="submit">{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</Button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={onChangePopup}>Войти</span>
      </p>
    </PopupWithForm>
  );
}

export default RegisterPopup;
