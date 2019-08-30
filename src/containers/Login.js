import React, { setGlobal } from 'reactn';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

// TODO: instrument link to contact support below
//import { Amplitude } from "@amplitude/react-amplitude";

class Login extends React.Component {
  componentDidMount() {
    const { userSession } = this.global;
    if(userSession.isUserSignedIn()) {
      if(userSession.loadUserData().devConfig.isVerified !==true) {
        if(window.location.href.includes('verify')){
          window.location.reload();
        } else {
          setGlobal({screen: "verification"});
        }
      }
    }
  }
  switchScreen = (screen) => {
    setGlobal({
      screen
    });
  }

  render() {
    const { screen } = this.global;
    return (
      <div>
        <div className="container page-margin">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-5">
              <div className="card cardbox" style={{minWidth:290}}>
                {
                  screen === "login" ?
                  <div style={{minWidth:200}}>
                    <div className="card-header black-text"><h5>SimpleID Sign-In Demo</h5></div>
                    <p className="black-text">Sign-In to this demo App using SimpleID by completing the form below.</p>
                    <SignIn
                      screen={screen}
                      switchScreen={this.switchScreen}
                    />
                  </div> :
                  screen === "verification" ?
                  <div className="black-text">
                    <div className="card-header">Verify Your Account</div>
                    <p>An email was sent to the email address you provided. Once, you click the link in the email, your account will be verified and ready to use.</p>
                    <hr />
                    <p>If you have any trouble receiving the link or verifying your account, please contact our <a href="https://simpleid.xyz">support team</a>.</p>
                  </div> :
                  <div>
                    <div className="card-header black-text"><h5>SimpleID Sign-Up Demo</h5></div>
                    <p className="black-text">Create a new account for this demo App using SimpleID by completing the form below.</p>
                    <SignUp
                      screen={screen}
                      switchScreen={this.switchScreen}
                    />
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
