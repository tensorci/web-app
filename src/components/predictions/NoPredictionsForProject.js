import React, { Component } from 'react';

class NoPredictionsForProject extends Component {

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
              <i className="bk-image-icon prediction"></i>
            </div>
            <div className="primary-msg">
              <span className="repo-name">{repo}</span> has no API deployment actively serving predictions.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoPredictionsForProject;