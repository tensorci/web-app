import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import NoDatasets from './NoDatasets';
import ProjectAside from '../shared/ProjectAside';
import ProjectDatasets from './ProjectDatasets';

class Datasets extends Component {

  constructor(props) {
    super(props);
    this.updateMainDisplay = this.updateMainDisplay.bind(this);

    this.state = {
      datasets: [],
      loading: true,
      repo: this.props.repo
    };
  }

  componentDidMount() {
    if (this.props.repo) {
      this.updateMainDisplay(this.props.repo);
    }
  }

  updateMainDisplay(repo) {
    Ajax.get('/api/datasets', { repo: repo, team: this.props.team })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          datasets: data.datasets,
          loading: false,
          repo: repo
        });
      });
  }

  getMainComp(team, repo) {
    if (this.state.loading) {
      return <div className="loading"></div>;
    }

    if (this.state.datasets.length === 0) {
      return <NoDatasets team={team} repo={repo}/>;
    }

    return <ProjectDatasets team={team} repo={repo} datasets={this.state.datasets}/>;
  }

  render() {
    const team = this.props.team;
    const repo = this.state.repo;

    return (
      <div id="datasets">
        <ProjectAside team={team} repo={repo} linkPrefix="/datasets" onAutoSelect={this.updateMainDisplay}/>
        <div className="main-display">
          <div className="main-body">
            {this.getMainComp(team, repo)}
          </div>
        </div>
      </div>
    );
  }
}

export default Datasets;