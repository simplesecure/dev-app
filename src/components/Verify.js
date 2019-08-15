import React, { setGlobal } from 'reactn';
import { decodeToken } from 'jsontokens'
import { verifyAccount } from '../actions/account';

class Stats extends React.Component{
  componentDidMount() {
    this.parseJWT();
  }
  parseJWT = async() => {
    const token = window.location.href.split('verify/')[1];
    const tokenData = decodeToken(token);
    console.log(tokenData);
    if(tokenData.payload.verificationID) {
      console.log("doing it")
      const verified = await verifyAccount(tokenData.payload.verificationID);
      console.log(verified);
      if(verified.message === "updated developer account") {
        setGlobal({ isVerified: true });
        let userDataObj = JSON.parse(localStorage.getItem('blockstack-session'));
        userDataObj.userData.devConfig = JSON.parse(verified.body);
        localStorage.setItem('blockstack-session', JSON.stringify(userDataObj));
        window.location.replace('/');
      }
    }
  }

  render() {
    return (
      <div className="page-margin">
        <div className="container">
        <h5>Verifying your account</h5>
        <p>Just a moment...</p>
        </div>
      </div>
    );
  }
}

export default Stats;