import { getMonthDateYear } from './misc';
import { getGlobal, setGlobal } from "reactn";
import { updateConfig } from 'simpleid-js-sdk';
const uuidAPIKey = require('uuid-apikey');

export async function createProject() {
  const userSession = getGlobal().userSession;
  const isUpgraded = getGlobal().isUpgraded;

  const projectKeys = uuidAPIKey.create();

  let projects = getGlobal().projects;
  const projDetails = {
    id: projectKeys.uuid,
    devId: userSession.loadUserData().apiKey,
    name: document.getElementById('project-name-input').value,
    url: document.getElementById('project-url-input').value,
    createdDate: getMonthDateYear(),
    apiKey: projectKeys.apiKey
  }

  if(projects.length < 1 || isUpgraded) {
    projects.push(projDetails);
    let devData = JSON.parse(localStorage.getItem('blockstack-session'));
    devData.userData.devConfig.projects = projects;
    const config =  devData.userData.devConfig;

    const updates = {
      userId: userSession.loadUserData().username,
      username: userSession.loadUserData().username,
      config,
      development: process.env.NODE_ENV === "production" ? false : true,
      apiKey: userSession.loadUserData().devConfig.apiKey
    }
    try {
      const update = await updateConfig(updates);
      console.log(update);
      setGlobal({ projects });
      localStorage.setItem('blockstack-session', JSON.stringify(devData));
      const modals = document.getElementsByClassName('modal-close');
      for(const modal of modals) {
        modal.click();
      }
    } catch(err) {
      console.log(err);
      //Need to read response and return the proper text here.
      document.getElementById("project-error").innerText = "Problem creating project";
    }
  } else {
    return {
      message: "You need to upgrade your plan to do this"
    }
  }
}

export async function deleteProject(id) {
  const userSession = getGlobal().userSession;
  let projects = getGlobal().projects;
  let projectsIndex = projects.map((x) => {return x.id }).indexOf(id);
  if(projectsIndex > -1) {
    projects.splice(projectsIndex, 1);
  } else {
    console.log("error removing module");
  }
  //Make call out to server to update projects
  //Need to send api key
  let devData = JSON.parse(localStorage.getItem('blockstack-session'));
  devData.userData.devConfig.projects = projects;
  const config =  devData.userData.devConfig;
  const updates = {
    userId: userSession.loadUserData().username,
    username: userSession.loadUserData().username,
    config,
    development: process.env.NODE_ENV === "production" ? false : true,
    apiKey: userSession.loadUserData().devConfig.apiKey
  }
  console.log(updates);
  try {
    const update = await updateConfig(updates);
    console.log(update);
    setGlobal({ projects });
  } catch(err) {
    console.log(err);
  }
  localStorage.setItem('blockstack-session', JSON.stringify(devData));
  setGlobal({ projects });
  const modals = document.getElementsByClassName('modal-close');
  for(const modal of modals) {
    modal.click();
  }
}
