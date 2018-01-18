import React, { Component } from 'react';
import ProjectAside from '../shared/ProjectAside';

class Predictions extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;

    return (
      <div id="predictions">
        <ProjectAside team={team} repo={repo} linkPrefix="/predictions"/>
        <div className="main-display">
          <div className="main-body">
          </div>
        </div>
      </div>
    );
  }
}

export default Predictions;