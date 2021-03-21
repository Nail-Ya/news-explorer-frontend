import React from 'react';
import './NotFound.scss';
import Icon from '../UI/Icon/Icon';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/reducers/rootReducer';

const NotFound: React.FC = () => {

  const isErrorNewsServer: boolean = useSelector((state: RootState) => state.componentsVisibility.isErrorNewsServer);

  // если возникла ошибка на сервере NewsApi, меняем текст ошибки
  const titleText: string = `${
    isErrorNewsServer
    ?
    'Во время запроса произошла ошибка'
    :
    'Ничего не найдено'
  }`

  const subtitleText: string = `${
    isErrorNewsServer
    ?
    'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    :
    'К сожалению по вашему запросу ничего не найдено.'
  }`

  return (
    <section className="not-found">
      <Icon
        className='not-found__image'
        name='not-found-icon'
      />
      <h3 className="not-found__title">{titleText}</h3>
      <p className="not-found__subtitle">{subtitleText}</p>
    </section>
  );
}

export default NotFound;
