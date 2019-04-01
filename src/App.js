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
      isAuthenticated: false,
      user: null,
    };
  }

  handleAuth = (isAuthenticated) => {
    this.setState(() => ({ isAuthenticated }));
  };

  loadUser = (user) => {
    this.setState(() => ({ user }));
  };

  setUserEntries = (entries) => {
    this.setState((state) => ({
      user: {...state.user,  entries},
    }));
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
            user={this.state.user}
            setUserEntries={this.setUserEntries}
          />
          <Route
            path="/login"
            render={(props) =>
              <Login
                {...props}
                isAuthenticated={this.state.isAuthenticated}
                handleAuth={this.handleAuth}
                loadUser={this.loadUser}
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
                loadUser={this.loadUser}
              />
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
