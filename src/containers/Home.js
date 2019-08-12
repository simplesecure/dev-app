import React, { getGlobal } from 'reactn';
import Account from '../components/Account';
import Login from './Login';

function Home() {
  const { isSignedIn } = getGlobal();
  return (
    <div>
      {
        isSignedIn ? 
        <Account />
        : 
        <Login />
      }
    </div>
  );
}

export default Home;