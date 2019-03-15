import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ImageZonesRecognition.css';

/**
 * @typedef {object} Props
 * @prop {array} recognizedZonesLocations
 * @prop {string} imageUrl
 * @prop {string} imageRef
 *
 * @extends {Component<Props>}
 */
class ImageZonesRecognition extends PureComponent {
  static propTypes = {
    recognizedZonesLocations: PropTypes.array.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageRef: PropTypes.func.isRequired,
  };

  renderRecognizedZones = () => {
    if (!this.props.recognizedZonesLocations || this.props.recognizedZonesLocations.length <= 0) {
      return null;
    }

    return (
      this.props.recognizedZonesLocations.map((box, i) => {
        return (
          <div
            key={`${box.leftCol} + ${i}`}
            className='bounding-box'
            style={{
              left: box.leftCol,
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
            }}
          />
        )
      })
    )
  };

  render() {
    const { imageUrl, imageRef } = this.props;

    return (
      <section className='flex justify-center w-100 pa4'>
        <div className='face-recognition-image-wrapper'>
          <img
            className='face-recognition-image'
            src={imageUrl}
            ref={imageRef}
            alt=''
          />
          {
            this.renderRecognizedZones()
          }
        </div>
      </section>
    );
  }
}

export default ImageZonesRecognition;
