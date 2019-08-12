import React from 'reactn';

class SignUp extends React.Component {
  render() {
    return (
      <div className="card-body">
        <div className="form-group">
  
          <form id="login-nav" method="post" className="form" accept-charset="UTF-8">
  
            <div className="form-group">
              <label className="sr-only">Username</label>
              <input type="text" id="reg_username" name="user_name" className="form-control"
                    value="" placeholder="Username" required />
            </div>

            <div className="form-group">
              <label className="sr-only">Email</label>
              <input type="text" id="reg_email" name="email" className="form-control"
                    value="" placeholder="Email" required />
            </div>
  
            <div className="form-group">
              <label className="sr-only">Password</label>
  
              <div className="input-group">
                <input type="password" id="reg_userpassword" name="user_password" className="form-control" data-placement="bottom" data-toggle="popover" data-container="body"
                      data-html="true" value="" placeholder="Password" required />
              </div>
            </div>
  
            <div className="form-group">
              <button id="reg_submit" name="submit" value="1" className="btn btn-block btn-primary">Sign Up</button>
            </div>
  
          </form>
        </div>
  
        <hr />
        <div className="bottom text-center">
          <span className="note">Signing up signifies you have read and agree to the <a href="https://simpleid.xyz">Terms of Service</a> and <a href="https://simpleid.xyz">Privacy Policy</a>.</span>
          <hr />
          Already have an account? <button className="link-button" onClick={() => this.props.switchScreen("login")}><b>Sign In</b></button>
        </div>
      </div>
    );
  }
}

export default SignUp;