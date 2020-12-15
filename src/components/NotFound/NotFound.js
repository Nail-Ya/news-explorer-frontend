import React from 'react';
import './NotFound.css'
import notFoundIcon from '../../images/not-found-icon.svg';

const NotFound = props => {

  return (
    <section className="not-found">
      <img src={notFoundIcon} alt="Иконка лупы" className="not-found__image" />
      <h3 className="not-found__title">Ничего не найдено</h3>
      <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
    </section>
  )
}

export default NotFound;
