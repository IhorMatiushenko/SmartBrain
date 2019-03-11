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
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(clarifaiFace);
    const image = this.imageElement;
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    console.log(imageWidth, imageHeight);
  };

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
      .then(generalModel => generalModel.predict(this.state.input))
      .then(response => this.calculateFaceLocation(response))
      .catch(err => console.error(err));
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
          imageRef={el => (this.imageElement = el)}
        />
      </div>
    );
  }
}

export default App;
