import { setGlobal, getGlobal } from 'reactn';

export function addModule(type, provider) {
  const modules = getGlobal().modules;
  if(type === "auth") {
    modules.auth.push(provider);
  } else if(type === "storage") {
    modules.storage.push(provider);
  }

  setGlobal({ modules, moduleChanges: true });
}

export function saveModules() {
  const modules = getGlobal().modules;
  console.log(modules);
}