import React, { setGlobal } from 'reactn';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

// TODO: instrument link to contact support below
//import { Amplitude } from "@amplitude/react-amplitude";

let renderCount = 0

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

  renderCard(screen, embedComponent=false) {
    let content = (
      <div>
        <div className="card-header black-text"><h5>Sign-Up</h5></div>
        <p className="black-text">Create a new account by completing the form below.</p>
        <SignUp hideSwitch={embedComponent} screen={screen} switchScreen={this.switchScreen} />
      </div> )

    if ((screen === 'login') && !embedComponent) {
      content = (
        <div style={{minWidth:200}}>
          <div className="card-header black-text"><h5>Sign-In</h5></div>
          <p className="black-text">Sign-In by completing the form below.</p>
          <SignIn screen={screen} switchScreen={this.switchScreen} />
        </div> )
    } else if (screen === 'verification') {
      content = (
        <div className="black-text">
          <div className="card-header">Verify Your Account</div>
          <p>An email was sent to the email address you provided. Once, you click the link in the email, your account will be verified and ready to use.</p>
          <hr />
          <p>If you have any trouble receiving the link or verifying your account, please contact our <a href="https://simpleid.xyz">support team</a>.</p>
        </div> )
    }

    return (
      <div className="card cardbox" style={{minWidth:290, minHeight:535}}>
        { content }
      </div>
    )
  }

  render() {
    const { screen } = this.global;

    let embedComponent = false
    try {
      embedComponent = (this.global.queryParams.embed === '1')
    } catch (suppressedError) {}

    console.log(`Login.js::render(${renderCount++}):  screen=${screen}, embedComponent=${embedComponent}`)

    if (embedComponent) {
      return this.renderCard(screen, true)
    }

    return (
      <div>
        <div className="container page-margin">
          <div className="row">
            <div className="col-md-5">
              {this.renderCard(screen, false)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
