import { setGlobal, getGlobal } from 'reactn';

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

export function saveModules() {
  const modules = getGlobal().modules;
  console.log(modules);
  //Need to hit the updateConfig endpoint here
}