import React, { Component } from 'react';
import Metrics from '../metrics/Metrics';
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
        <div className="main-display">
          <div className="main-body">
            <Metrics/>
          </div>
        </div>
      </div>
    );
  }
}

export default Predictions;