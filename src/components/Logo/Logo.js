import React from 'react';

import Brain from './brain.png';

const Logo = () => {
  return (
    <div className='logo flex justify-between items-center pa3'>
      <img className='logo-image mr2' src={Brain} alt="Brain"/>
      <h1>Smart Brain</h1>
    </div>
  );
};

export default Logo;
