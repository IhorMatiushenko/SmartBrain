import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='flex justify-center pa4 w-100'>
      <img className='mw-100' src={imageUrl} alt=""/>
    </div>
  );
};

export default FaceRecognition;
