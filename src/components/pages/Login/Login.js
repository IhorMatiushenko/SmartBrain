import React, { PureComponent } from 'react';
import { Redirect, Link } from "react-router-dom";
import PropTypes from 'prop-types';


class Login extends PureComponent {
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
    };
  }

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

  onSubmitLogin = () => {
    fetch('http://localhost:3002/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status.toString() === 'success') {
          this.login(data.user);
        }
      });
  };

  login = (user) => {
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
            <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Login</legend>
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
                value="Log in"
                onClick={this.onSubmitLogin}
              />
            </div>
            <div className="lh-copy mt3">
              <Link to="/register" className="f6 link dim black db">Register</Link>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default Login;
