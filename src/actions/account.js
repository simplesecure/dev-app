import { createUserAccount, login, updateConfig, getConfig } from 'simpleid-js-sdk';
import { setGlobal, getGlobal } from 'reactn';
import { UserSession, AppConfig } from 'blockstack';

const config = {
  authProviders: ['blockstack'],
  storageProviders: [],
  appOrigin: "https://app.simpleid.xyz",
  scopes: ['publish_data', 'store_write', 'email'],
  isDev: true,
  apiKey: "-LmCb96-TquOlN37LpM0",
  devId: "imanewdeveloper",
  development: process.env.NODE_ENV === "production" ? false : true
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
    let authModules; 

    if(signIn.body.store.sessionData.userData.devConfig.authModules) {
      authModules = signIn.body.store.sessionData.userData.devConfig.authModules;

    } else {
      authModules = [];
    }
    
    let storageModules; 
    let projects;
    if(signIn.body.store.sessionData.userData.devConfig.storageModules) {
      storageModules = signIn.body.store.sessionData.userData.devConfig.storageModules;

    } else {
      storageModules = [];
    }

    if(signIn.body.store.sessionData.userData.devConfig.projects) {
      projects = signIn.body.store.sessionData.userData.devConfig.projects;
    } else {
      projects = [];
    }

    signIn.body.store.sessionData.userData.devConfig.authModules = authModules;
    signIn.body.store.sessionData.userData.devConfig.storageModules = storageModules;
    signIn.body.store.sessionData.userData.devConfig.projects = projects;
    if(signIn.body.store.sessionData.userData.devConfig.isVerified) {
      await setGlobal({
        isVerified: true,
        isSignedIn: true,
        modules: { auth: authModules || [], storage: storageModules || [] }, 
        projects
      });
    } else {
      setGlobal({
        screen: "verification"
      })
    }
    localStorage.setItem('blockstack-session', JSON.stringify(signIn.body.store.sessionData))
    const appConfig = new AppConfig(['store_write', 'publish_data', 'email']);
    const userSession = new UserSession({ appConfig });
    setGlobal({ userSession });
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
  if(config.authModules && config.authModules.length < 1) {
    delete config.authModules;
  }
  if(config.storageModules && config.storageModules.length < 1) {
    delete config.storageModules;
  }

  config.isVerified = true;
  const updates = {
    userId: userSession.loadUserData().username,
    username: userSession.loadUserData().username,
    verificationID,
    config,
    development: process.env.NODE_ENV === "production" ? false : true
  }
  console.log(updates);
  const update = await updateConfig(updates, true);
  console.log(update);
  return update;
}

export async function getUpdatedConfig() {
  const { userSession } = getGlobal();
  const params = {
    devId: userSession.loadUserData().username,
    development: process.env.NODE_ENV === "production" ? false : true,
    apiKey: config.apiKey
  }
  const devConfig = await getConfig(params);
  let configObj = JSON.parse(devConfig.body).config;
  let authModules = configObj.authModules;
  // let authModStrings = authModules.split('[')[1].split(']')[0];
  // let authModArray = authModStrings.split(',');

  let storageModules = configObj.storageModules;
  // let storageModStrings = storageModules.split('[')[1].split(']')[0];
  // let storageModArray = storageModStrings.split(',');

  configObj.authModules = authModules || [];
  configObj.storageModules = storageModules || [];
  let userData = JSON.parse(localStorage.getItem('blockstack-session'));
  userData.userData.devConfig = configObj;
  localStorage.setItem('blockstack-session', JSON.stringify(userData));
}

export function newKey() {
  //requires existing key to be sent
  //need to call out to the server, generate a new key, return the key along with the account config object
}
