import React from 'react';
import './RegisterPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import classnames from 'classnames';
import Button from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import FormValidator from '../../hooks/FormValidator';
import { RootState } from '../../store/reducers/rootReducer';
import {
  setIsLoginPopupOpenActionCreator,
  setIsRegisterPopupOpenActionCreator,
  setIsSuccessPopupOpenActionCreator
} from '../../store/actions/popupsActionCreators';
import * as mainApi from '../../utils/MainApi';

const RegisterPopup: React.FC = () => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorFormText, setErrorFormText] = React.useState<string>('');
  const isRegisterPopupOpen: boolean = useSelector((state: RootState) => state.popups.isRegisterPopupOpen);
  const dispatch = useDispatch();
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = FormValidator();

  // регистрация пользователя
  const handleUserRegister = (email: string, password: string, name: string): Promise<any> => {
    setIsLoading(true);
    return mainApi.register(email, password, name)
      .then(() => {
        dispatch(setIsRegisterPopupOpenActionCreator(false));
        dispatch(setIsSuccessPopupOpenActionCreator(true));
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации нового пользователя: ${err}`)
        setErrorFormText(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // колбек сабмита формы
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    handleUserRegister(values.email!, values.password!, values.name!);
  }

  const switchToLoginPopup = (): void => {
    dispatch(setIsRegisterPopupOpenActionCreator(false));
    dispatch(setIsLoginPopupOpenActionCreator(true));
  };

  React.useEffect(() => {
    resetForm();
    setErrorFormText('');
  }, [isRegisterPopupOpen, resetForm]);

  const submitButtonClassName: string = classnames('popup__button', {
    'popup__button_disabled': !isValid
  });

  return (
    <PopupWithForm
      isOpen={isRegisterPopupOpen}
      onClose={() => dispatch(setIsRegisterPopupOpenActionCreator(false))}
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
        errorText={errors.email!}
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
        errorText={errors.password!}
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
        errorText={errors.name!}
      />
      <span id="form-input-error" className="popup__form_error_active">{errorFormText}</span>
      <Button className={submitButtonClassName} type="submit">{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</Button>
      <p className="popup__text">
        или&nbsp;
        <span className="popup__link" onClick={switchToLoginPopup}>Войти</span>
      </p>
    </PopupWithForm>
  );
}

export default RegisterPopup;
