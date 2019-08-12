import React from 'reactn';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import logo from '../assets/img/simpleid_white_logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "login"
    }
  }

  switchScreen = (screen) => {
    console.log(screen);
    this.setState({
      screen
    });
  }

  render() {
    const { screen } = this.state;
    return (
      <div>
        <div className="container">
          <div className="center">
            <img className="logo" src={logo} alt="simpleid logo" />
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-5">
              <div className="card cardbox">
                {
                  screen === "login" ?
                  <div>
                    <div className="card-header">Login</div>
                    <SignIn 
                      screen={screen}
                      switchScreen={this.switchScreen}
                    />
                  </div> : 
                  screen === "verification" ? 
                  <div>
                    <div className="card-header">Verify Your Account</div>
                    <p>An email was sent to the email address you provided. Once, you click the link in the email, your account will be verified and ready to use.</p>
                    <hr />
                    <p>If you have any trouble receiving the link or verifying your account, please contact our <a href="https://simpleid.xyz">support team</a>.</p>
                  </div> : 
                  <div>
                    <div className="card-header">Sign Up</div>
                    <p>Create a new account by completing the form below.</p>
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