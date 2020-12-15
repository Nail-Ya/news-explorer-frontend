import React from 'react';
import './Navigation.css'
import { Route, Switch, Link } from 'react-router-dom';

const Navigation = props => {
  const { onLogin } = props;

  return (
    <Switch>
      <Route path="/main">
        <nav className="header-navigation">
          <Link to="/main" className="header-navigation__link header-navigation__link_active_black">Главная</Link>
          <button onClick={onLogin} className="header-navigation__button">Авторизоваться</button>
        </nav>
      </Route>

      <Route path="/saved-news">
        <nav className="header-navigation">
          <Link to="/main" className="header-navigation__link header-navigation__link_theme_white">Главная</Link>
          <Link to="/saved-news" className="header-navigation__link header-navigation__link_active_white header-navigation__link_theme_white">Сохранённые статьи</Link>
          <button className="header-navigation__button header-navigation__button_theme_white">
            Грета
            <span className="header-navigation__button-icon header-navigation__button-icon_theme_white"></span>
          </button>
        </nav>
      </Route>
    </Switch>
  )
}

export default Navigation;
