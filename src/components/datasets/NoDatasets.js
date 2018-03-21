import React, { Component } from 'react';

class NoDatasets extends Component {

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
          <div className="no-datasets">
            <div className="icon-container">
              <i className="fa fa-table"></i>
            </div>
            <div className="primary-msg">
              <span className="team-name">{team}</span> has no datasets for <span className="repo-name">{repo}</span>
            </div>
            <div className="secondary-msg">Learn how to add one with the TensorCI CLI.</div>
            <div className="action-btn-center-container">
              <a href="http://docs.tensorci.com/en/latest/datasets.html" className="button primary small" rel="noopener noreferrer" target="_blank">View Docs</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoDatasets;