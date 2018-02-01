import React, { Component } from 'react';

class NoMetrics extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div className="card">
        <div className="card-header">
          <div className="title">
            <i className="provider-icon fa fa-github"></i>
            {team + '/' + repo}
          </div>
        </div>
        <div className="card-body">
          <div className="no-graphs">
            <div className="icon-container">
              <i className="fa fa-bar-chart"></i>
            </div>
            <div className="primary-msg">
              <span className="project-name">{repo}</span> has no metrics for this deployment.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoMetrics;