import React from 'react';
import './About.css'
import avatar from '../../images/avatar.jpg';

const About = props => {
  return (
    <section className="about">
      <div className="about-container">
        <img className="about__image" src={avatar} alt="Аватар пользователя" />
        <div className="about__description">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__subtitle">Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.</p>
          <p className="about__subtitle">Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.</p>
        </div>
      </div>
    </section>
  )
}

export default About;
