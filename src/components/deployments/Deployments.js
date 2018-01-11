import React, { Component } from 'react';
import DeploymentsList from './DeploymentsList';
import ProjectAside from '../shared/ProjectAside';

class Deployments extends Component {

  constructor(props) {
    super(props);
    this.updateDeploymentsList = this.updateDeploymentsList.bind(this);
  }

  updateDeploymentsList(repo) {
    this.deploymentsList.setState({ repo: repo });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div id="deployments">
        <ProjectAside team={team} repo={repo} onAutoSelect={this.updateDeploymentsList}/>
        <div className="main-display">
          <DeploymentsList team={team} repo={repo} ref={(ref) => { this.deploymentsList = ref; }}/>
        </div>
      </div>
    );
  }
}

export default Deployments;