import React, { Component } from 'react';
import Dataset from './Dataset';

class ProjectDatasets extends Component {

  formatDatasets(datasets) {
    return (datasets || []).map((d, i) => {
      return <Dataset key={i} info={d} refresh={this.props.refresh}/>;
    });
  }

  render() {
    const datasets = this.props.datasets;

    return (
      <div>{this.formatDatasets(datasets)}</div>
    );
  }
}

export default ProjectDatasets;