import React, { getGlobal } from 'reactn';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import { createProject } from '../actions/projects';
import { checkAccountPlan } from '../actions/account';
import { Modal, TextInput } from 'react-materialize';

function Account() {
  const { projects, modules } = getGlobal();
  return (
    <div className="page-margin">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            {
              checkAccountPlan() || projects.length < 1 ? 
              <Modal className="black-text" header="Create New Project" trigger={<button className="btn btn-secondary">Create New Project</button>}>
                <p>All we need is a project name.</p>
                <TextInput id="project-name-input" label="Project Name" />
                <button onClick={createProject} className="black btn">Create</button>
              </Modal> : 
              <div>
                <button className="btn btn-secondary">Upgrade Account</button>
                <p>You'll need to upgrade to add more projects</p>
              </div>
            }
          <h5>Your Current Projects</h5>
          {
            projects.length > 0 ?
            <Projects />
            : 
            <div>
              <p>You haven't created any projects yet. What are you waiting for?</p>
            </div>
          }
          </div>
          <div className="col s12 m6">
            <Link to={'/modules'}><button className="btn btn-secondary">Edit Modules</button></Link>
            <h5>Your Current Modules</h5>
            <p>Authentication Modules:</p>
            {
              modules.auth.length > 0 ?
              <div>
                {
                  modules.auth.map(a => {
                    return (
                      <div className="card-panel">
                        <h6 className="black-text">{a}</h6>
                      </div>
                    )
                  })
                }
              </div> : 
              <div className="card-panel black-text">
                <p>You have not yet selected any authentication modules to include in your application.</p>
              </div>
            }
            <p>Storage Modules</p>
            {
              modules.storage.length > 0 ?
              <div>
                {
                  modules.storage.map(s => {
                    return (
                      <div className="card-panel">
                        <h6 className="black-text">{s}</h6>
                      </div>
                    )
                  })
                }
              </div> : 
              <div className="card-panel black-text">
                <p>You have not yet selected any storage modules to include in your application.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;