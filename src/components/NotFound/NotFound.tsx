import React from 'react';
import './NotFound.css';
import notFoundIcon from '../../images/not-found-icon.svg';

export type Props = {
  errorNewsServer: boolean;
};

const NotFound: React.FC<Props> = ({
  errorNewsServer
}) => {

  // если возникла ошибка на сервере NewsApi, меняем текст ошибки
  const titleText: string = `${
    errorNewsServer
    ?
    'Во время запроса произошла ошибка'
    :
    'Ничего не найдено'
  }`

  const subtitleText: string = `${
    errorNewsServer
    ?
    'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
    :
    'К сожалению по вашему запросу ничего не найдено.'
  }`

  return (
    <section className="not-found">
      <img src={notFoundIcon} alt="Иконка лупы" className="not-found__image" />
      <h3 className="not-found__title">{titleText}</h3>
      <p className="not-found__subtitle">{subtitleText}</p>
    </section>
  );
}

export default NotFound;
