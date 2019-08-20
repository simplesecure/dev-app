import React from 'reactn';
import { handleSignUp } from '../actions/account';
import signupButton from '../assets/img/signupButton.png';

import { Amplitude } from "@amplitude/react-amplitude";

class SignUp extends React.Component {
  getSignupEventProperties = (inheritedProperties) => {
    try {
      const email = document.getElementById('email-input-signup').value
      return {email}
    } catch (suppressedError) {}

    return {}
  }

  render() {
    const { loading } = this.global;
    return (
      <div className="card-body black-text">
        <div className="form-group">

          <form onSubmit={handleSignUp} id="login-nav" method="post" className="form" acceptCharset="UTF-8">

            <div className="form-group">
              <label className="sr-only">Username</label>
              <input type="text" id="username-input-signup" name="user_name" className="form-control"
                    placeholder="Username" required />
            </div>

            <div className="form-group">
              <label className="sr-only">Email</label>
              <input type="text" id="email-input-signup" name="email" className="form-control"
                    placeholder="Email" required />
            </div>

            <div className="form-group">
              <label className="sr-only">Password</label>

              <div className="input-group">
                <input type="password" id="password-input-signup" name="user_password" className="form-control" data-placement="bottom" data-toggle="popover" data-container="body"
                      data-html="true" placeholder="Password" required />
              </div>
            </div>

            <div className="form-group">
              {
                loading ?
                <button id="reg_submit" name="submit" value="1" className="btn btn-block btn-primary">Regemail: document.getElementById('email-input-signup').valueistering Account...</button> :
                (
                  <Amplitude
                    eventProperties={this.getSignupEventProperties}>
                    {({ logEvent }) =>
                      <button
                        onClick={() => { logEvent('Sign Up Clicked') }}
                        id="reg_submit"
                        name="submit"
                        value="1"
                        className="link-button">
                        <img className="loginButton" src={signupButton} alt="signup" />
                      </button>
                    }
                  </Amplitude>
                )
              }

              <span id="error-message" className="red-text"></span>
            </div>

          </form>

        </div>

        <hr />
        <div className="black-text bottom text-center">
          <span className="note">Signing up signifies you have read and agree to the <a href="https://simpleid.xyz">Terms of Service</a> and <a href="https://simpleid.xyz">Privacy Policy</a>.</span>
          <hr />
          Already have an account? <button className="link-button" onClick={() => this.props.switchScreen("login")}><b>Sign In</b></button>
        </div>
      </div>
    );
  }
}

export default SignUp;
