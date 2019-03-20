import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './Navigation.css';
import Logo from '../Logo/Logo';

class Navigation extends PureComponent {
  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  renderAuthNavigation = () => {
    const { handleAuth, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <p
          className='f3 link dim black underline pa3 pointer'
          onClick={() => handleAuth(false)}
        >
          Log Out
        </p>
      )
    } else {
      return (
        <div>
          <Link to="/login" className='f3 link dim black underline pa3 pointer'>Log in</Link>
          <Link to="/register" className='f3 link dim black underline pa3 pointer'>Register</Link>
        </div>
      )
    }
  };

  render() {
    return (
      <nav className="nav flex justify-between items-center bb">
        <Logo />
        {
          this.renderAuthNavigation()
        }
      </nav>
    )
  }
}

export default Navigation;
