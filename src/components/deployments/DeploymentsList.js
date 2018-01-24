import React, { Component } from 'react';
import DeploymentListItem from './DeploymentListItem';
import NoDeploymentsForProject from './NoDeploymentsForProject';

class DeploymentsList extends Component {

  formatDeployments(deployments, team, repo) {
    if (!deployments || deployments.length === 0) {
      return <NoDeploymentsForProject team={team} repo={repo} refreshDeployments={this.props.refreshDeployments}/>;
    }

    return deployments.map((d, i) => {
      return <DeploymentListItem key={i} info={d} team={team} repo={repo}/>;
    });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const deployments = this.props.deployments || [];

    return (
      <div className="main-body">
        <div className="deployment-list">
          <div className="container-fluid">
            {this.formatDeployments(deployments, team, repo)}
          </div>
        </div>
      </div>
    );
  }
}

export default DeploymentsList;