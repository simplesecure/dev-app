import React from 'reactn';
import { handleSignIn } from '../actions/account';

class SignIn extends React.Component {
  render() {
    const { loading } = this.global;
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
              <div className="help-block text-right">
                <small><a href="https://simpleid.xyz">Forgot Password</a></small>
              </div>       
  
  
            </div>
  
            <div className="form-group">
              <button id="reg_submit" name="submit" value="1" className="btn btn-block btn-primary">{loading ? "Logging in..." : "Login"}</button>
            </div>  
          </form>
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