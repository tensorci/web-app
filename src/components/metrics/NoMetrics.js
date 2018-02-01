import React, { Component } from 'react';

class NoMetrics extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const pleaseSelect = this.props.pleaseSelect;

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
              {pleaseSelect ? <span>Please select a deployment from the side menu.</span> : <span><span className="repo-name">{repo}</span> has no metrics for this deployment.</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoMetrics;