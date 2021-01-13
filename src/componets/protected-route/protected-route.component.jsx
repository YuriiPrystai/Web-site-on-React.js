import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { config } from '../../config';

const ProtectedRoute = ({
  path, component: Component, render, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (localStorage.getItem('auth') !== config.token) {
        return (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: props.location },
            }}
          />
        );
      }
      return Component ? <Component {...props} /> : render(props);
    }}
  />
);

export default ProtectedRoute;
