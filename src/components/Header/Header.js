import React from 'react';
import './Header.css'
import Navigation from './../Navigation/Navigation';
import { Route, Switch, Link } from 'react-router-dom';

const Header = props => {
  const {
    onLogin,
    onMobileHeader,
  } = props;

  return (
    <Switch>
      <Route path="/main">
        <header className="header">
          <div className="header__container">
            <Link to="/main" className="header__logo">NewsExplorer</Link>
            <Navigation
              onLogin={onLogin}
            />
            <button className="header__burger-menu-button" onClick={onMobileHeader}></button>
          </div>
        </header>
      </Route>

      <Route path="/saved-news">
        <header className="header header_theme_white">
          <div className="header__container">
            <Link to="/main" className="header__logo header__logo_theme_white">NewsExplorer</Link>
            <Navigation
              onLogin={onLogin}
            />
            <button className="header__burger-menu-button header__burger-menu-button_theme_white" onClick={onMobileHeader}></button>
          </div>
        </header>
      </Route>
    </Switch>
  )
}

export default Header;
