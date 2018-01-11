import React, { Component } from 'react';
import ProjectAside from '../shared/ProjectAside';

class Deployments extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div id="deployments">
        <ProjectAside team={team} repo={repo} />
        <div className="main-display"></div>
      </div>
    );
  }
}

export default Deployments;