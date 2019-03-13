import Clarifai from 'clarifai';

import clarifaiApp from '../api/clarifaiAPI';


class ImageRecognition {

  static getRecognizedZones(data) {
    return data.outputs[0].data.regions;
  };

  static getRecognizedZonesLocations(image, recognizedZones) {
    if (recognizedZones.length <= 0) return;

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

  static getImageData(imageUrl) {
    clarifaiApp.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
      .then(generalModel => generalModel.predict(imageUrl))
      .then(response => {
        this.getRecognizedZones(response);
      })
      .catch(err => console.error(err));
  };

}

export default ImageRecognition
