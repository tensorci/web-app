import React, { Component } from 'react';
import Envs from './Envs';

class ProjectEnvs extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div className="main-content">
        <div className="project-settings-inner">
          <legend>Environment Variables</legend>
          <div className="card">
            <div className="card-body">
              <p>Configure environment variables for your project when running on the TensorCI training cluster.</p>
              <Envs team={team} repo={repo}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectEnvs;