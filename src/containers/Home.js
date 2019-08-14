import React, { getGlobal } from 'reactn';
import Account from '../components/Account';
import Login from './Login';
let userVerified;

function Home() {
  const { isSignedIn, userSession } = getGlobal();
  if(isSignedIn) {
    userVerified = userSession.loadUserData().devConfig.isVerified;
  }
  return (
    <div>
      {
        isSignedIn ? 
        userVerified ? 
        <Account />
        : 
        <Login />
        : 
        <Login />
      }
    </div>
  );
}

export default Home;