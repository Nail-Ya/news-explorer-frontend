import React from 'react';
import './Preloader.css'

const Preloader = props => {
  return (
    <section className="preloader">
      <i className="preloader__circle"></i>
      <p className="preloader__text">Идет поиск новостей...</p>
    </section>
  )
}

export default Preloader;
