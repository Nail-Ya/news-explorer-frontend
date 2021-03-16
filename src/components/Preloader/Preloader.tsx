import React from 'react';
import './Preloader.css';

const Preloader: React.FC = () => (
  <section className="preloader">
    <i className="preloader__circle"></i>
    <p className="preloader__text">Идет поиск новостей...</p>
  </section>
);

export default Preloader;
