import React from 'reactn';
import { handleSignIn } from '../actions/account';
import loginButton from '../assets/img/loginButton.png';

import { Amplitude } from "@amplitude/react-amplitude";

class SignIn extends React.Component {
  handleCorsTest(e)
  {
    e.preventDefault()

    return fetch(
      "https://grsj1lmlse.execute-api.us-west-2.amazonaws.com/v1/cors",
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '-LmCb96-TquOlN37LpM0'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({testData: 'CORS testing with fetch POST.'})
      }
    )
    .then(response => {
      console.log('Success!')
    })
    .catch(error => {
      console.log('Failure!')
    })
  }



  render() {
    const { loading } = this.global;

    const CORS_TEST_BUTTON = false
    let testCorsButton = (CORS_TEST_BUTTON) ?
        (
          <form onSubmit={this.handleCorsTest}>
            <button id="cors_submit" name="submit" value="1" className="btn btn-block btn-primary">CORS TEST</button>
          </form>
        ) : undefined

    return (
      <div className="card-body black-text">
        <div className="form-group">

          <form onSubmit={handleSignIn} id="login-nav" method="post" className="form" acceptCharset="UTF-8">

            <div className="form-group">
              <label className="sr-only">Username</label>
              <input type="text" id="username-input-signin" name="user_name" className="form-control"
                    placeholder="Username" required />
            </div>

            <div className="form-group">


              <label className="sr-only">Password</label>

              <div className="input-group">
                <input type="password" id="password-input-signin" name="user_password" className="form-control" data-placement="bottom" data-toggle="popover" data-container="body"
                      data-html="true" placeholder="Password" required />
              </div>
              <div style={{display: "none"}} id="sign-in-error">
                <p className="red-text">Trouble signing in, please check your username/password.</p>
              </div>
              <div className="help-block text-right">
                <Amplitude>
                  {({ logEvent }) =>
                    <small><a onClick={() => { logEvent('Forgot Password Clicked') }} href="https://simpleid.xyz">Forgot Password</a></small>
                  }
                </Amplitude>
              </div>


            </div>

            <div className="form-group">
              {
                loading ?
                <button id="reg_submit" name="submit" value="1" className="btn btn-block btn-primary">Logging in...</button> :
                (
                  <Amplitude>
                    {({ logEvent }) =>
                      <button
                        onClick={() => { logEvent('Sign In Clicked') }}
                        id="reg_submit"
                        name="submit"
                        value="1"
                        className="link-button">
                        <img className="loginButton" src={loginButton} alt="login" />
                      </button>
                    }
                  </Amplitude>
                )
              }

            </div>
          </form>

          {testCorsButton}
        </div>

        <hr />
        <div className="black-text bottom text-center">
          Need to sign up? <button className="link-button" onClick={() => this.props.switchScreen("register")}><b>Register</b></button>
        </div>
      </div>
    );
  }
}

export default SignIn;
