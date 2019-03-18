import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, handleAuth, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? <Component
                {...props}
                handleAuth={handleAuth}
              />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }}/>
    )} />
);

export default ProtectedRoute;