import React, { getGlobal } from 'reactn';
import Account from '../components/Account';
import Login from './Login';
const userVerified = true //JSON.parse(localStorage.getItem('simpleIDVerification'));

function Home() {
  const { isSignedIn } = getGlobal();
  console.log(isSignedIn);
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