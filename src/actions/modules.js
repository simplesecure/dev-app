import { setGlobal, getGlobal } from 'reactn';
import { updateConfig } from 'simpleid-js-sdk';

export function addModule(type, provider) {
  const modules = getGlobal().modules;
  if(type === "auth") {
    if(modules.auth.indexOf(provider) > -1) {
      let authIndex = modules.auth.map((x) => {return x }).indexOf(provider);
      if(authIndex > -1) {
        modules.auth.splice(authIndex, 1);
      } else {
        console.log("error removing module");
      }
    } else {
      modules.auth.push(provider);
    }
  } else if(type === "storage") {
    if(modules.storage.indexOf(provider) > -1) {
      let storageIndex = modules.storage.map((x) => {return x }).indexOf(provider);
      if(storageIndex > -1) {
        modules.storage.splice(storageIndex, 1);
      } else {
        console.log("error removing module");
      }
    } else {
      modules.storage.push(provider);
    }
  }
  console.log(modules);
  setGlobal({ modules, moduleChanges: true });
}

export async function saveModules() {
  const modules = getGlobal().modules;
  const userSession = getGlobal().userSession;
  console.log(modules);
  let devData = JSON.parse(localStorage.getItem('blockstack-session'));
  devData.userData.devConfig.storageModules = modules.storage;
  devData.userData.devConfig.authModules = modules.auth;
  const config =  devData.userData.devConfig;
  localStorage.setItem('blockstack-session', JSON.stringify(devData));
  setGlobal({ moduleChanges: false });
  const updates = {
    userId: userSession.loadUserData().username,
    username: userSession.loadUserData().username,
    config, 
    development: true, 
    apiKey: userSession.loadUserData().devConfig.apiKey
  }
  console.log(updates);
  try {
    const update = await updateConfig(updates);
    console.log(update);
  } catch(err) {
    console.log(err);
  }
  //Need to hit the updateConfig endpoint here
}