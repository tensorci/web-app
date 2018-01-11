import React, { Component } from 'react';

class NoDeploymentsForProject extends Component {

  render() {
    const repo = this.props.repo || {};

    return (
      <div className="no-deployments-for-project">
        <div>No deployments exist yet for <span>{repo}</span></div>
      </div>
    );
  }
}

export default NoDeploymentsForProject;