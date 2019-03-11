import React from 'react';

import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, imageRef }) => {
  return (
    <section className='flex justify-center w-100 pa4'>
      <div className='face-recognition-image-wrapper'>
        <img
          className='face-recognition-image'
          src={imageUrl}
          ref={imageRef}
        />
      </div>
    </section>
  );
};

export default FaceRecognition;
