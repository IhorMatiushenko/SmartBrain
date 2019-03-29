import React from 'react';
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isAuthenticated, handleAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component
          {...props}
          handleAuth={handleAuth}
          isAuthenticated={isAuthenticated}
          {...rest}
        />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
    )} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleAuth: PropTypes.func,
};


export default ProtectedRoute;
