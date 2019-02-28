import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Runk';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm />

        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
