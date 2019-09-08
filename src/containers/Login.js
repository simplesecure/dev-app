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
      <div style={{minWidth:200}}>
        <div className="card-header black-text"><h4><b>Sign-Up</b></h4></div>
        <h5 className="black-text">Create a new account by completing the form below.</h5>
        <SignUp hideSwitch={embedComponent} screen={screen} switchScreen={this.switchScreen} />
      </div> )

    if ((screen === 'login') && !embedComponent) {
      content = (
        <div style={{minWidth:200}}>
          <div className="card-header black-text"><h4><b>Sign-In</b></h4></div>
          <h5 className="black-text">Sign-In by completing the form below.</h5>
          <SignIn screen={screen} switchScreen={this.switchScreen} />
        </div> )
    } else if (screen === 'verification') {

      // TODO: talk to Justin about how to get the account name (it's not in user session)
      let accountName = ''
      // try {
      //   accountName = this.global.
      // } catch (suppressedError) {}

      let mailHref = `mailto:hello@simpleid.xyz?subject=Help%20verifying%20account%20${accountName}`
      content = (
        <div style={{minWidth:200}}>
          <div className="card-header black-text"><h4><b>Verify Your Account</b></h4></div>
          <h5 className="black-text">An email was sent to the email address you provided. Once, you click the link in the email, your account will be verified and ready to use.</h5>
          <hr />
          <h5 className="black-text">If you have trouble receiving the link or verifying your account, please contact our support team at <a href={mailHref}><i>hello@simpleid.xyz</i></a>.</h5>
        </div> )
    }

    return (
      <div className="card cardbox-lg">
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
