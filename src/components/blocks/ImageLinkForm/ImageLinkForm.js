import React from 'react';
import PropTypes from 'prop-types';

import './ImageLinkForm.css';

/**
 * @param onInputChange
 * @param onButtonSubmit
 * @returns {*}
 * @constructor
 */
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className='flex justify-center'>
        <div className='form flex justify-center pa4 br3 shadow-5'>
          <input
            className='f4 pa2 w-70'
            type='text'
            onChange={onInputChange}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-mid-gray'
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

ImageLinkForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onButtonSubmit: PropTypes.func.isRequired,
};

export default ImageLinkForm;
