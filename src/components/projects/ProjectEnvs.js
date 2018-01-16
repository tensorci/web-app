import React, { Component } from 'react';

class ProjectEnvs extends Component {

  render() {
    return (
      <div className="main-content">
        <div className="project-settings-inner">
          <legend>Environment Variables</legend>
          <div className="card">
            <div className="card-body">
              <p>Some lead in text about what these can be used for and when they're pulled, etc.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEnvs;