import React, { Component } from 'react';
import ProjectAside from '../shared/ProjectAside';

class Datasets extends Component {

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div id="datasets">
        <ProjectAside team={team} repo={repo} linkPrefix="/datasets"/>
        <div className="main-display"></div>
      </div>
    );
  }
}

export default Datasets;