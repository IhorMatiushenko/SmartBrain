import React from 'react';
import PropTypes from 'prop-types';

import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ handleAuth }) => {
  return (
    <nav className="nav flex justify-between items-center bb">
      <Logo />
      <p
        className='f3 link dim black underline pa3 pointer'
        onClick={() => handleAuth(false)}
      >
        Log Out
      </p>
    </nav>
  );
};

Navigation.propTypes = {
  handleAuth: PropTypes.func.isRequired,
};

export default Navigation;
