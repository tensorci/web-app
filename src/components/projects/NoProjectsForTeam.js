import React, { Component } from 'react';

class NoProjectsForTeam extends Component {

  render() {
    const team = this.props.team;

    return (
      <div className="card">
        <div className="card-header">
          <div className="title">
            <i className="provider-icon fa fa-github"></i>
            {team}
          </div>
        </div>
        <div className="card-body">
          <div className="no-projects">
            <div className="icon-container">
              <i className="material-icons">book</i>
            </div>
            <div className="primary-msg">
              <span className="team-name">{team}</span> has no projects building on TensorCI
            </div>
            <div className="secondary-msg">Let's fix that by adding a new project.</div>
            <div className="action-btn-center-container">
              <a href={'/add-projects/' + team} className="button primary small">Add Project</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoProjectsForTeam;