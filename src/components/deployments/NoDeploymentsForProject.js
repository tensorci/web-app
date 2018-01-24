import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import SpinnerBtn from '../shared/SpinnerBtn';

class NoDeploymentsForProject extends Component {

  constructor(props) {
    super(props);
    this.startTraining = this.startTraining.bind(this);
  }

  startTraining(team, repo) {
    const payload = {
      git_url: 'https://github.com/' + team + '/' + repo + '.git',
      with_log_stream: false
    };

    Ajax.post('/api/deployment/train', payload)
      .then((resp) => {
        if (resp.status === 200 || resp.status === 201) {
          if (this.props.refreshDeployments) {
            this.props.refreshDeployments();
          }
        } else {
          // error
        }
      });
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
            <div className="primary-msg">
              No deployments exist yet for <span className="repo-name">{repo}</span>.
            </div>
            <div className="secondary-msg">Let's fix that by deploying to the TensorCI training cluster.</div>
            <div className="action-btn-center-container">
              <SpinnerBtn className="primary" onClick={() => { this.startTraining(team, repo);} }>Start training</SpinnerBtn>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default NoDeploymentsForProject;