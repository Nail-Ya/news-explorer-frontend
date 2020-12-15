import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  const { handleLoginClick } = props;
  const isloggedIn = JSON.parse(localStorage.getItem('loggedIn'))

  // открытие попапа авторизации
  React.useEffect(() => {
    if (!isloggedIn) {
      handleLoginClick();
    }
  }, [isloggedIn, handleLoginClick]);

  return (
    <Route>
      {
        () => isloggedIn ? <Component {...props} /> : <Redirect to="/main" />
      }
    </Route>
  )
}

export default ProtectedRoute;
