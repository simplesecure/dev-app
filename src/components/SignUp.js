import React from 'reactn';
import { handleSignUp } from '../actions/account';
import signupButton from '../assets/img/signupButton.png';
//import Loading from './Loading';

import { Amplitude } from "@amplitude/react-amplitude";

class SignUp extends React.Component {
  constructor(props) {
    super()

    this.hideSwitch = false
    try {
      this.hideSwitch = props.hideSwitch
    } catch (suppressedError) {}
  }

  getSignupEventProperties = (inheritedProperties) => {
    try {
      const email = document.getElementById('email-input-signup').value
      return {email}
    } catch (suppressedError) {}

    return {}
  }

  render() {
    const { loading, amplitudeHelper } = this.global;

    const switchPrompt = (!this.hideSwitch) ?
      ( <div><hr />Have an account? <button className="link-button" onClick={() => this.props.switchScreen("login")}><b>Sign-In</b></button></div> ) :
      undefined


    return (
      <div className="card-body black-text">
        <div className="form-group">

          <form onSubmit={handleSignUp} id="login-nav" method="post" className="form" acceptCharset="UTF-8">

            <div className="form-group">
              {/* <label className="sr-only">Username</label> */}
              <input type="text" id="username-input-signup" name="user_name" className="form-control"
                    placeholder="Username" required />
            </div>

            <div className="form-group">
              {/* <label className="sr-only">Email</label> */}
              <input type="text" id="email-input-signup" name="email" className="form-control"
                    placeholder="Email" required />
            </div>

            <div className="form-group">
              {/* <label className="sr-only">Password</label> */}
              <div className="input-group">
                <input type="password" id="password-input-signup" name="user_password" className="form-control" data-placement="bottom" data-toggle="popover" data-container="body"
                      data-html="true" placeholder="Password" required />
              </div>
            </div>

            <div className="form-group">
              <div>
                <span id="error-message" className="red-text"></span>
              </div>
              {
                loading ?
                <div>
                  <div className="card-header blue-text text-darken-2" style={{marginTop:20}}><h6>Creating Account...</h6></div>
                  {/* <button id="reg_submit" name="submit" value="1" className="btn btn-block btn-primary" style={{marginTop:20}}>Registering Account...</button> */}
                  {/*<Loading />*/}
                  <div className="progress">
                    <div className="indeterminate"></div>
                  </div>
                </div> :
                (
                  <Amplitude
                    eventProperties={amplitudeHelper.getEventProperties(this.getSignupEventProperties())}>
                    {({ logEvent }) =>
                      <button
                        onClick={() => { logEvent(amplitudeHelper.getEventName('Sign Up Clicked')) }}
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
            </div>

          </form>

        </div>

        <hr />
        <div className="black-text bottom text-center">
          <Amplitude
            eventProperties={amplitudeHelper.getEventProperties()}>
            {({ logEvent }) =>
              <span className="note">Signing up signifies you have read and agree to the <a onClick={() => { logEvent(amplitudeHelper.getEventName('TOS Clicked')) }} href="https://www.termsfeed.com/terms-conditions/b13d80e035b2e120f019f9d657067884" target='_blank' rel="noopener noreferrer">Terms of Service</a> and <a
                onClick={() => { logEvent(amplitudeHelper.getEventName('Privacy Clicked')) }}
                target='_blank'
                href="https://www.termsfeed.com/privacy-policy/3ef420f2df55bacbf56ef22223e07aa2"
                rel="noopener noreferrer">Privacy Policy</a>.</span>
            }
          </Amplitude>
          {switchPrompt}
        </div>
      </div>
    );
  }
}

export default SignUp;
