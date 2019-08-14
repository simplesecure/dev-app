import React from 'reactn';
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