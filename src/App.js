import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Runk';
import ImageZonesRecognition from './components/ImageZonesRecognition/ImageZonesRecognition';

import ImageRecognition from './services/ImageRecognition';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      recognizedZones: [],
      recognizedZonesLocations: [],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.calculateRecognizedZonesLocations.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateRecognizedZonesLocations.bind(this));
  }

  setRecognizedZones = async () => {
    const recognizedZones = await ImageRecognition.getImageData(this.state.input);

    this.setState(() => ({
      recognizedZones: recognizedZones
    }), this.calculateRecognizedZonesLocations);
  };

  calculateRecognizedZonesLocations = () => {
    const image = this.imageElement;
    const recognizedZones = this.state.recognizedZones;

    const recognizedZonesLocations = ImageRecognition.getRecognizedZonesLocations(image, recognizedZones);

    this.displayRecognizedZones(recognizedZonesLocations);
  };

  displayRecognizedZones = (recognizedZonesLocations) => {
    this.setState(() => ({ recognizedZonesLocations }));
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

    this.setRecognizedZones();
  };

  render() {
    const { recognizedZonesLocations, imageUrl } = this.state;

    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <ImageZonesRecognition
          recognizedZonesLocations={recognizedZonesLocations}
          imageUrl={imageUrl}
          imageRef={el => (this.imageElement = el)}
        />
      </div>
    );
  }
}

export default App;
