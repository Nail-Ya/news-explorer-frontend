import React from 'react';
import './Footer.css'
import githubIcon from '../../images/social-icon1.svg';
import facebookIcon from '../../images/social-icon2.svg';
import { Link } from 'react-router-dom';

const Footer = props => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer__text">&copy; 2020 Supersite, Powered by News API</p>
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
                <img src={githubIcon} alt="Иконка github" className="footer__social-icon" />
              </a>
            </li>
            <li className="footer__social-icon-item">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="footer__social-icon-link">
                <img src={facebookIcon} alt="Иконка facebook" className="footer__social-icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
