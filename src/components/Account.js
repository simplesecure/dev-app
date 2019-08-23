import React from 'reactn';
import { Link } from 'react-router-dom';
import Projects from './Projects';
import { createProject } from '../actions/projects';
import { Modal, TextInput } from 'react-materialize';

class Account extends React.Component {
  upgradeModal = () => {
    document.getElementById('upgradeButton').click();
  }
  render() {
    const { projects, modules, isUpgraded } = this.global;
    return (
      <div className="page-margin">
        <div className="container">
          <div className="row">
            <div style={{marginBottom: "20px"}} className="col s12">
              <h3>Account</h3>
              {
                isUpgraded ?
                <p>You may create multiple projects and select multiple modules to include in your project.</p> :
                <div>
                  <p>Your free account allows you to create one project with Blockstack Authentication and Blockstack Storage. If you'd like to create additional projects or use additional modules, <button style={{color: "#fff", textDecoration: "underline"}} className="link-button" onClick={this.upgradeModal}>please upgrade</button>.</p>
                </div>
              }
            </div>
            <div className="col s12 m6">
              {
                (isUpgraded || (projects && projects.length < 1)) ?
                <Modal className="black-text" header="Create New Project" trigger={<button className="btn btn-secondary">Create New Project</button>}>
                  <p>All we need is a project name and a URL. If this is a mobile app, you canuse your marketing site URL. All URLs must be https.</p>
                  <TextInput id="project-name-input" label="Project Name" />
                  <TextInput id="project-url-input" label="Project URL" />
                  <p className="red-text" id="project-error"></p>
                  <button onClick={createProject} className="black btn">Create</button>
                </Modal> :
                <div>
                  <button onClick={this.upgradeModal} className="btn btn-secondary">Upgrade Account</button>
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
                        <div key={a} className="card-panel">
                          <h6 className="black-text">{a.charAt(0).toUpperCase() + a.slice(1)}</h6>
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
                        <div key={s} className="card-panel">
                          <h6 className="black-text">{s.charAt(0).toUpperCase() + s.slice(1)}</h6>
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
}

export default Account;
