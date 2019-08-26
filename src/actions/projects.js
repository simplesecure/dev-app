import { getMonthDateYear } from './misc';
import { getGlobal, setGlobal } from "reactn";
import { getUpdatedConfig } from './account';
import { updateConfig } from 'simpleid-js-sdk';
const uuidAPIKey = require('uuid-apikey');

export async function createProject() {
  document.getElementById('project-error').innerText = "";
  const userSession = getGlobal().userSession;
  const isUpgraded = getGlobal().isUpgraded;

  const projectKeys = uuidAPIKey.create();

  const name = document.getElementById('project-name-input').value;
  const url = document.getElementById('project-url-input').value;

  const nameCheck = name.length > 0 ? true : false;
  const urlCheck = url.length > 5 && url.substring(0, 5) === "https" ? true : false;
  
  let projects = await getGlobal().projects;
  const projDetails = {
    id: projectKeys.uuid,
    devId: userSession.loadUserData().apiKey,
    name,
    url,
    createdDate: getMonthDateYear(),
    apiKey: projectKeys.apiKey
  }
  //If no name supplied, reject
  if(nameCheck) {
    //If url is not https, reject
    if(urlCheck) {
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
          if(update.message === "failed to update developer account") {
            //Need to read response and return the proper text here.
            document.getElementById("project-error").innerText = update.body.error;
            await getUpdatedConfig();
            await setGlobal({ projects: userSession.loadUserData().devConfig.projects || [] });
          } else {
            setGlobal({ projects });
            localStorage.setItem('blockstack-session', JSON.stringify(devData));
            const modals = document.getElementsByClassName('modal-close');
            document.getElementById('project-name-input').value = "";
            document.getElementById('project-url-input').value = "";
            for(const modal of modals) {
              modal.click();
            }
          }
        } catch(err) {
          console.log(err);
          //Need to read response and return the proper text here.
          document.getElementById("project-error").innerText = "Project URL is already in use";
        }
      } else {
        return {
          message: "You need to upgrade your plan to do this"
        }
      }
    } else {
      document.getElementById('project-error').innerText = "Please make sure your project uses 'https'";
    }
  } else {
    document.getElementById('project-error').innerText = "Please make sure your project has a name";
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
