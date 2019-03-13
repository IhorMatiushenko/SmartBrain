import React from 'react';

import './FaceRecognition.css';

const FaceRecognition = ({ faceBoxes, imageUrl, imageRef }) => {
  function renderRecognizedZones() {
    if (faceBoxes.length <= 0) {
      return null;
    }
    return (
      faceBoxes.map((box, i) => {
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
  }

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
          renderRecognizedZones()
        }
      </div>
    </section>
  );
};

export default FaceRecognition;
