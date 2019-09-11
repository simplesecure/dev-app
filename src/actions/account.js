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

function validateEmail(email) {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function statusCallbackFn(aStatusMessage) {
  setGlobal( { loading:true, loadingMessage:aStatusMessage } )
}

export async function handleSignUp(e) {
  document.getElementById('error-message').innerText = "";
  e.preventDefault();
  //need to make sure usernames are all lowercase.
  const id = document.getElementById('username-input-signup').value.toLowerCase();
  const email = document.getElementById('email-input-signup').value;

  if(id.split(" ").length > 1) {
    //This means the user has spaces in their username
    document.getElementById('error-message').innerText = "Please make sure your username does not have spaces";
  } else {
    const validEmail = validateEmail(email);
    if(validEmail) {
      setGlobal({
        loading: true,
        loadingMessage: 'Creating Account...'
      });
      const credObj = {
        id,
        password: document.getElementById('password-input-signup').value,
        hubUrl: "https://hub.blockstack.org",
        email
      }
      try {
        const account = await createUserAccount(
          credObj,
          config,
          { statusCallbackFn: statusCallbackFn }
        );
        console.log(account);
        if(account.message === "name taken" ||
           (account.message && account.message.message && account.message.message.includes('Username already exists')) ) {
          setGlobal({
            loading: false,
            loadingMessage: 'Creating Account...'
          });
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
    } else {
      document.getElementById('error-message').innerText = "Please provide a valid email address";
    }
  }
}

export async function handleSignIn(e) {
  e.preventDefault();
  //need to make sure usernames are all lowercase.
  const id = document.getElementById('username-input-signin').value.toLowerCase();
  document.getElementById('sign-in-error').style.display = "none";
  setGlobal({ loading: true });
  const credObj = {
    id,
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
  let userCount = JSON.parse(devConfig.body).numberUsers ? JSON.parse(devConfig.body).numberUsers : 0;
  setGlobal({
    userCount
  })
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
