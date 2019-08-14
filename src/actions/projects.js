import { makeUUID4 } from "blockstack";
import { getMonthDateYear } from './misc';
import { getGlobal, setGlobal } from "reactn";
import { checkAccountPlan } from './account';

export function createProject() {
  let projects = getGlobal().projects;
  const plan = checkAccountPlan();
  const projDetails = {
    id: makeUUID4(),
    name: document.getElementById('project-name-input').value, 
    createdDate: getMonthDateYear(), 
    active: true
  }

  //This is where we will update the dev account with the project and get an api key back
  projDetails.apiKey = ""//this will be from the response
  if(projects.length < 1 || plan.upgraded) {
    projects.push(projDetails);
    setGlobal({ projects });
  } else {
    return {
      message: "You need to upgrade your plan to do this"
    }
  }
  const modals = document.getElementsByClassName('modal-close');
  for(const modal of modals) {
    modal.click();
  }
  //post to update config endpoint
}