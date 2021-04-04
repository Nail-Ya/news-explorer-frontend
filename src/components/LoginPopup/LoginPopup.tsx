import React from 'react';
import './LoginPopup.scss';
import PopupWithForm from './../PopupWithForm/PopupWithForm';
import {
  ServerResponseAtLogin,
  User
} from '../../utils/types';
import classnames from 'classnames';
import Button from './../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import * as mainApi from '../../utils/MainApi';
import {
  setCurrentUserActionCreator,
  setIsLoggedInActionCreator
} from '../../store/actions/userActionCreators';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormValidator from '../../hooks/FormValidator';
import { RootState } from '../../store/reducers/rootReducer';
import {
  setIsLoginPopupOpenActionCreator,
  setIsRegisterPopupOpenActionCreator
} from '../../store/actions/popupsActionCreators';

const LoginPopup: React.FC = () => {
  const isLoginPopupOpen: boolean = useSelector((state: RootState) => state.popups.isLoginPopupOpen);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorFormText, setErrorFormText] = React.useState<string>('');
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = FormValidator();

  React.useEffect(() => {
    resetForm();
    setErrorFormText('');
  }, [isLoginPopupOpen, resetForm]);

  const submitButtonClassName: string = classnames('popup__button', {
    'popup__button_disabled': !isValid
  });

  // Логин пользователя
  const handleLogin = (email: string, password: string): Promise<any> => {
    setIsLoading(true);
    return mainApi.authorize(email, password)
      .then((data: ServerResponseAtLogin) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        dispatch(setIsLoginPopupOpenActionCreator(false));

        mainApi.getUserInfo(data.token)
          .then((res: User) => {
            localStorage.setItem('user', JSON.stringify(res));
            dispatch(setCurrentUserActionCreator(res));
            dispatch(setIsLoggedInActionCreator(true));
            history.push('/main');
          })
          .catch((err) => console.log(`Ошибка при получении данных пользователя после входа в систему: ${err}`));
      })
      .catch((err) => {
        console.log(`Ошибка при входе пользователя в систему: ${err}`)
        setErrorFormText(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    handleLogin(values.emailLogin!, values.passwordLogin!);
  }

  // Функция для перехода по ссылке в попап регистрации
  const switchToRegisterPopup = (): void => {
    dispatch(setIsLoginPopupOpenActionCreator(false));
    dispatch(setIsRegisterPopupOpenActionCreator(true));
  };

  return (
    <PopupWithForm
      isOpen={isLoginPopupOpen}
      onClose={() => dispatch(setIsLoginPopupOpenActionCreator(false))}
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
        errorText={errors.emailLogin!}
      />
      <span className="popup__input-text">Пароль</span>
      <Input
        type="password"
        name="passwordLogin"
        placeholder="Введите пароль"
        required={true}
        minLength={10}
        maxLength={30}
        onChange={handleChange}
        value={values.passwordLogin || ''}
        errorText={errors.passwordLogin!}
      />
      <span className="popup__form_error_active">{errorFormText}</span>
      <Button
        className={submitButtonClassName}
        type='submit'
      >
        {isLoading ? 'Загрузка...' : 'Войти'}
      </Button>
      <p className="popup__text">
        или&nbsp;
        <span
          className="popup__link"
          onClick={switchToRegisterPopup}
        >
          Зарегистрироваться
        </span>
      </p>
    </PopupWithForm>
  );
}

export default LoginPopup;
