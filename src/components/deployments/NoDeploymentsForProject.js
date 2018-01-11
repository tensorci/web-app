import React, { Component } from 'react';

class NoDeploymentsForProject extends Component {

  constructor(props) {
    super(props);
    this.startTraining = this.startTraining.bind(this);
  }

  startTraining() {

  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div className="card">
        <div className="card-header">
          <div className="title">
            <i className="provider-icon fa fa-github"></i>
            {team}/{repo}
          </div>
        </div>
        <div className="card-body">
          <div className="no-deployments">
            <div className="icon-container">
              <i className="material-icons">storage</i>
            </div>
            <div className="primary-msg">
              No deployments exist yet for <span className="repo-name">{repo}</span>.
            </div>
            <div className="secondary-msg">Let's fix that by deploying to the TensorCI training cluster.</div>
            <div className="action-btn-center-container">
              <button className="button primary small" onClick={this.startTraining}>Start Training</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default NoDeploymentsForProject;