import React, { Component } from 'react';

class ProjectCreds extends Component {

  render() {
    return (
      <div className="main-content">
        <div className="project-settings-inner">
          <legend>Project Credentials</legend>
          <div className="card">
            <div className="card-header">
              <div className="title">
                <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/github.svg" alt="Github"/>
              </div>
            </div>
            <div className="card-body">
              <p>Train models and serve predictions from your GitHub repositories.</p>
              <p className="connection-status">Connected to whittlbc.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectCreds;