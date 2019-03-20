import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Main from './components/pages/Main/Main';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: true,
    };
  }

  handleAuth = (isAuthenticated) => {
    this.setState(() => ({ isAuthenticated }));
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isAuthenticated={this.state.isAuthenticated}
            handleAuth={this.handleAuth}
          />
          <Route
            path="/login"
            render={(props) =>
              <Login
                {...props}
                isAuthenticated={this.state.isAuthenticated}
                handleAuth={this.handleAuth}
              />
            }
          />
          <Route
            path="/register"
            render={(props) =>
              <Register
                {...props}
                isAuthenticated={this.state.isAuthenticated}
                handleAuth={this.handleAuth}
              />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
