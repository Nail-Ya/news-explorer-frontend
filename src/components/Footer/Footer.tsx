import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Icon from './../Icon/Icon';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-container">
      <p className="footer__text">&copy; 2021 Supersite, Powered by News API</p>
      <div className="footer__social">
        <ul className="footer__links">
          <li className="footer__link-item">
            <Link to="/main" className="footer__link">Главная</Link>
          </li>
          <li className="footer__link-item">
            <a href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className="footer__social-icons">
          <li className="footer__social-icon-item">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__social-icon-link">
              <Icon
                className='footer__social-icon'
                name='github-icon'
              />
            </a>
          </li>
          <li className="footer__social-icon-item">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__social-icon-link">
              <Icon
                className='footer__social-icon'
                name='facebook-icon'
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
