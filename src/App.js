import React, { Component } from 'react';
import Clarifai from 'clarifai';

import clarifaiApp from './api/clarifaiAPI';

import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Runk';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    };
  }

  onInputChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      input: value,
    }));
  };

  onButtonSubmit = () => {
    this.setState(() => ({
      imageUrl: this.state.input,
    }));

    clarifaiApp.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => {
        return generalModel.predict(this.state.input);
      })
      .then(response => {
        const regions = response['outputs'][0]['data']['regions'];
        console.log(regions);
      })
      .catch(err => {
        console.error(err);
      })
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
