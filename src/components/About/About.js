import React from 'react';
import './About.css'
import avatar from './../../images/avatar.jpg';

const About = props => {
  return (
    <section className="about">
      <div className="about-container">
        <img className="about__image" src={avatar} alt="Аватар пользователя" />
        <div className="about__description">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__subtitle">Привет! Меня зовут Наиль, я junior frontend разработчик :) Умею верстать адаптивно и по БЭМ, знаю JavaScript, React, Redux. Изучил для себя backend, а именно Node.js, Express и MongoDB. </p>
          <p className="about__subtitle">Данное приложение написано на стеке MERN (MongoDB, Express, React , Node.js)</p>
        </div>
      </div>
    </section>
  )
}

export default About;
