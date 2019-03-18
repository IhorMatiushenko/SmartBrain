import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Navigation from '../../blocks/Navigation/Navigation';
import ImageLinkForm from '../../blocks/ImageLinkForm/ImageLinkForm';
import Rank from '../../blocks/Rank/Runk';
import ImageZonesRecognition from '../../blocks/ImageZonesRecognition/ImageZonesRecognition';

import ImageRecognitionService from '../../../services/ImageRecognition.service';

import './Main.css';

class Main extends PureComponent {
  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
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


  /**
   * IMAGE RECOGNITION
   */

  /**
   * Get from API recognized zones and save them in the state.
   * To calculate recognized zones locations for displaying on image
   * @returns {Promise<void>}
   */
  setRecognizedZones = async () => {
    const recognizedZones = await ImageRecognitionService.getImageData(this.state.input);

    this.setState(() => ({
      recognizedZones: recognizedZones
    }), this.calculateRecognizedZonesLocations);
  };

  /**
   * To calculate recognized zones locations and display them on image
   */
  calculateRecognizedZonesLocations = () => {
    const image = this.imageElement;
    const recognizedZones = this.state.recognizedZones;

    const recognizedZonesLocations = ImageRecognitionService.getRecognizedZonesLocations(image, recognizedZones);

    this.displayRecognizedZones(recognizedZonesLocations);
  };

  /**
   * Save recognized zones in the state for displaying on image
   * @param {array} recognizedZonesLocations
   */
  displayRecognizedZones = (recognizedZonesLocations) => {
    this.setState(() => ({ recognizedZonesLocations }));
  };

  /**
   * Save image url from form input in the state
   * @param event
   */
  onInputChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      input: value,
    }));
  };

  /**
   * Save image url from this.state.input in the state for displaying image.
   * Get recognized zones from API
   */
  onButtonSubmit = () => {
    this.setState(() => ({
      imageUrl: this.state.input,
    }));

    this.setRecognizedZones();
  };

  /**
   * RENDER
   */

  render() {
    const { recognizedZonesLocations, imageUrl } = this.state;
    const { handleAuth } = this.props;

    return (
      <div className="Main">
        <Navigation
            handleAuth={handleAuth}
        />
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

export default Main;
