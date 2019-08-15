import React from 'reactn';
import { Modal, TextInput } from 'react-materialize';
import { newKey } from '../actions/account';
import { deleteProject } from '../actions/projects';

class Projects extends React.Component {
  render() {
    const { projects, userSession } = this.global;

    return (
      <div>
        {
          projects.map(proj => {
            return (
              <div key={proj.id} className="project black-text">
                <div className="card-panel">
                  <div className="row">
                    <div className="col s6">
                      <div>
                        <h6>{proj.name}</h6>
                        <p>{proj.active ? "Active" : "Inactive"}</p>
                      </div>
                    </div>
                    <div className="col s6">
                      <div>
                        <Modal className="black-text" header={proj.name} trigger={<button className="btn btn-primary">View Project</button>}>
                          <h5>Project Created: </h5>
                          <p>{proj.createdDate}</p>
                          <h5>Developer ID</h5>
                          <div style={{cursor: "pointer"}}>
                            <TextInput disabled={true} icon="content_copy" value={userSession.loadUserData().username} />
                          </div>
                          <h5>API Key</h5>
                          <div style={{cursor: "pointer"}}>
                            <TextInput disabled={true} icon="content_copy" value={userSession.loadUserData().devConfig.apiKey} />
                          </div>
                          <button onClick={newKey} className="btn black">Generate New Key</button>
                        </Modal>
                        <br/>
                        <Modal className="black-text" header={`Delete ${proj.name}?`} trigger={<button style={{marginTop: "20px"}} className="link-button red-text">Delete Project</button>}>
                          <h5>Are you sure?</h5>
                          <p>This cannot be done and any applications associated with this project will stop working.</p>
                          <button onClick={() => deleteProject(proj.id)} className="btn red">Yes, Delete</button>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Projects;