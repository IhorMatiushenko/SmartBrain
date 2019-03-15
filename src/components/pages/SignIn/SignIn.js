import React from 'react';

const SingIn = () => {
  return (
    <section className="center mw5 mw6-ns br3 hidden ba b--black-10 mv6 shadow-5">
      <section className="pa4 black-80">
        <form className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100" type="email" name="email-address" id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-light-gray hover-black w-100" type="password" name="password" id="password" />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" />
              &nbsp; Remember me
            </label>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db">Sign up</a>
          </div>
        </form>
      </section>
    </section>

  );
};

export default SingIn;
