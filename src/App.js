import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import SingIn from './components/pages/SignIn/SignIn';
import Main from './components/pages/Main/Main';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {

    };
  }

  render() {


    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Main} />
          <Route path="/login" component={SingIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
