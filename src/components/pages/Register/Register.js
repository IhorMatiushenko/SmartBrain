import React, { PureComponent } from 'react';
import { Redirect, Link } from "react-router-dom";
import PropTypes from 'prop-types';


class Register extends PureComponent {
  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: '',
      password: '',
      name: '',
    };
  }

  onNameChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      name: value,
    }));
  };

  onEmailChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      email: value,
    }));
  };

  onPasswordChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      password: value,
    }));
  };

  onSubmitRegister = () => {
    fetch('http://localhost:3002/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          this.register(user);
        }
      });
  };

  register = (user) => {
    this.setState(() => ({
      redirectToReferrer: true
    }), () => {
      this.props.handleAuth(true);
      this.props.loadUser(user);
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' }};
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <section className="center mw5 mw6-ns br3 hidden ba b--black-10 mv6 shadow-5">
        <section className="pa4 black-80">
          <section className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="user-name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100"
                  type="text"
                  name="user-name"
                  id="user-name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" />
                &nbsp; Remember me
              </label>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
            <div className="lh-copy mt3">
              <Link to="/login" className="f6 link dim black db">Log in</Link>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Register;
