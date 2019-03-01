import React from 'react';

import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = () => {
  return (
    <nav className="nav flex justify-between items-center bb">
      <Logo />
      <p className='f3 link dim black underline pa3 pointer'>Sing Out</p>
    </nav>
  );
};

export default Navigation;
