import React from 'reactn';
import Account from '../components/Account';
import Login from './Login';

class Home extends React.Component {
  render() {
    const { isSignedIn, isVerified } = this.global;
    console.log(isSignedIn);
    console.log(isVerified);
    return (
      <div>
        {
          isSignedIn ? 
          isVerified ? 
          <Account />
          : 
          <Login />
          : 
          <Login />
        }
      </div>
    );
  }
}

export default Home;