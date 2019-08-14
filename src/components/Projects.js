import React from 'reactn';

class Projects extends React.Component {
  render() {
    const { projects } = this.global;
    console.log(projects);
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
                        <button className="btn btn-primary">View Project</button> <br/>
                        <button style={{marginTop: "20px"}} className="link-button red-text">Delete Project</button>
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