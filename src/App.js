import React, { Component } from 'react';
import Clarifai from 'clarifai';

import clarifaiApp from './api/clarifaiAPI';

import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Runk';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

// import ImageRecognition from './services/ImageRecognition';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      imageData: [],
      faceBoxes: [],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.calculateFacesLocations.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateFacesLocations.bind(this));
  }

  calculateFacesLocations = () => {
    if (this.state.imageData.length <= 0) return;

    const image = this.imageElement;
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    const facesLocations = this.state.imageData.map(faceData => {
      const boundingBox = faceData.region_info.bounding_box;

      return {
        leftCol: boundingBox.left_col * imageWidth,
        topRow: boundingBox.top_row * imageHeight,
        rightCol: imageWidth - (boundingBox.right_col * imageWidth),
        bottomRow: imageHeight - (boundingBox.bottom_row * imageHeight),
      };
    });

    this.displayFacesBoxes(facesLocations);
  };


  setFacesLocations = (data) => {
    const regions = data.outputs[0].data.regions;
    this.setState(() => ({
      imageData: regions
    }), this.calculateFacesLocations());
  };

  displayFacesBoxes = (faceBoxes) => {
    this.setState(() => ({ faceBoxes }));
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
      .then(response => {
        this.setFacesLocations(response);
      })
      .catch(err => console.error(err));
  };

  render() {
    const { faceBoxes, imageUrl } = this.state;

    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          faceBoxes={faceBoxes}
          imageUrl={imageUrl}
          imageRef={el => (this.imageElement = el)}
        />
      </div>
    );
  }
}

export default App;
