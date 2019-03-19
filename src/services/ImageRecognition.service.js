import Clarifai from 'clarifai';

import clarifaiApp from '../api/clarifaiAPI';

/**
 * image recognition service
 */
class ImageRecognitionService {

  /**
   * @param {string} imageUrl
   * @returns {Promise<T | never | void>}
   */
  static getImageData(imageUrl) {
    return clarifaiApp.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
        .then(generalModel => generalModel.predict(imageUrl))
        .then(response => {
          return this.getRecognizedZones(response);
        })
        .catch(err => console.error(err));
  };

  /**
   * @param {array} data
   * @returns {Regions|*}
   */
  static getRecognizedZones(data) {
    return data.outputs[0].data.regions;
  };


  /**
   * @param image
   * @param {array} recognizedZones
   * @returns {Object|Uint8Array|BigInt64Array|{leftCol: number, topRow: number, rightCol: number, bottomRow: number}[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array|*}
   */
  static getRecognizedZonesLocations(image, recognizedZones) {
    if (!recognizedZones || recognizedZones.length === 0) return;

    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    return recognizedZones.map(recognizedZone => {
      const boundingBox = recognizedZone.region_info.bounding_box;

      return {
        leftCol: boundingBox.left_col * imageWidth,
        topRow: boundingBox.top_row * imageHeight,
        rightCol: imageWidth - (boundingBox.right_col * imageWidth),
        bottomRow: imageHeight - (boundingBox.bottom_row * imageHeight),
      };
    });
  };

}

export default ImageRecognitionService
