import React, { getGlobal } from 'reactn';

function Projects() {
  const { projects } = getGlobal();
  return (
    <div>
      {
        projects.map(proj => {
          return (
            <div key={proj.id} className="project">
              <div className="card-panel">
                <div className="row">
                  <div className="col s6">
                    <div>
                      <h6>{proj.name}</h6>
                      <p>{proj.status}</p>
                    </div>
                  </div>
                  <div className="col s6">
                    <div>
                      <button className="btn btn-secondary">View Project</button> <br/>
                      <button className="btn btn-red">Delete Project</button>
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

export default Projects;