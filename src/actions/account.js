import { createUserAccount, login, updateConfig } from 'simpleid-js-sdk';
import { setGlobal, getGlobal } from 'reactn';

const config = {
  authProviders: ['blockstack'], 
  storageProviders: [], 
  appOrigin: "https://app.simpleid.xyz", 
  scopes: ['publish_data', 'store_write', 'email'], 
  isDev: true, 
  apiKey: "-LmCb96-TquOlN37LpM0", 
  devId: "imanewdeveloper", 
  development: true
}
export async function handleSignUp(e) {
  document.getElementById('error-message').innerText = "";
  e.preventDefault();
  setGlobal({ loading: true });
  const credObj = {
    id: document.getElementById('username-input-signup').value,
    password: document.getElementById('password-input-signup').value,
    hubUrl: "https://hub.blockstack.org", 
    email: document.getElementById('email-input-signup').value
  }
  try {
    const account = await createUserAccount(credObj, config);
    console.log(account);
    if(account.message === "name taken") {
      setGlobal({ loading: false });
      document.getElementById('error-message').innerText = "Sorry, that name has already been registered";
    } else {
      setGlobal({
        screen: "verification"
      });
      localStorage.setItem('blockstack-session', JSON.stringify(account.body.store.sessionData))
    }
  } catch(err) {
    console.log(err);
    setGlobal({
      screen: "login"
    })
  }
}

export async function handleSignIn(e) {
  e.preventDefault();
  document.getElementById('sign-in-error').style.display = "none";
  setGlobal({ loading: true });
  const credObj = {
    id: document.getElementById('username-input-signin').value,
    password: document.getElementById('password-input-signin').value,
    hubUrl: "https://hub.blockstack.org"
  }
  const params = {
    credObj,
    appObj: config,
    userPayload: {}
  }
  try {
    const signIn = await login(params);
    console.log(signIn);
    if(signIn.body.store.sessionData.userData.devConfig.isVerified) {
      console.log("here we go")
      setGlobal({
        isVerified: true, 
        isSignedIn: true
      })
    } else {
      setGlobal({
        screen: "verification"
      })
    }
    localStorage.setItem('blockstack-session', JSON.stringify(signIn.body.store.sessionData))
  } catch(err) {
    console.log(err);
    document.getElementById('sign-in-error').style.display = "block";
    setGlobal({
      screen: "login", 
      loading: false
    })
  }
}

export function handleSignOut(e) {
  console.log("signing out...")
  localStorage.removeItem('blockstack-session');
  localStorage.removeItem('simpleIDVerification');
  window.location.reload();
}

export function checkAccountPlan() {
  const account = getGlobal().account;
  if(account.isUpgraded) {
    return true;
  } else {
    return false;
  }
}

export async function verifyAccount(verificationID) {
  console.log("verifying...")
  const { userSession } = getGlobal();
  const config = userSession.loadUserData().devConfig;
  config.isVerified = true;
  config.accountInfo.isCurrent = true;
  const updates = {
    userId: userSession.loadUserData().username,
    username: userSession.loadUserData().username,
    verificationID, 
    config, 
    development: true
  }
  console.log(updates);
  const update = await updateConfig(updates, true);
  console.log(update);
  return update;
}

export function newKey() {
  //requires existing key to be sent
  //need to call out to the server, generate a new key, return the key along with the account config object
}