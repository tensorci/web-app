import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import NoDatasets from './NoDatasets';
import ProjectAside from '../shared/ProjectAside';
import ProjectDatasets from './ProjectDatasets';

class Datasets extends Component {

  constructor(props) {
    super(props);

    this.fetchReposAndDatasets = this.fetchReposAndDatasets.bind(this);
    this.fetchDatasets = this.fetchDatasets.bind(this);
    this.getDatasetsComp = this.getDatasetsComp.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      loading: true,
      projects: [],
      datasets: [],
      team: this.props.team,
      repo: this.props.repo
    };
  }

  componentDidMount() {
    this.fetchReposAndDatasets();
  }

  componentDidUpdate() {
    // Repo was changed, so just refetch datasets for this repo
    if (this.props.repo && (this.props.repo !== this.state.repo)) {
      this.fetchDatasets(this.props.repo);
    }
  }

  fetchReposAndDatasets() {
    const payload = {
      team: this.state.team,
      repo: this.state.repo,
      with_datasets: true
    };

    Ajax.get('/api/repos', payload, (data) => {
      this.setState({
        projects: data.repos || [],
        datasets: data.datasets || [],
        repo: data.repo,
        loading: false
      });
    });
  }

  fetchDatasets(repo) {
    const payload = {
      team: this.state.team,
      repo: repo
    };

    Ajax.get('/api/datasets', payload, (data) => {
      this.setState({
        datasets: data.datasets || [],
        repo: repo
      });
    });
  }

  refresh() {
    this.fetchDatasets(this.state.repo);
  }

  getDatasetsComp() {
    if (!this.state.projects || this.state.projects.length === 0) {
      return;
    }

    if (!this.state.datasets || this.state.datasets.length === 0) {
      return <NoDatasets team={this.state.team} repo={this.state.repo}/>;
    }

    return <ProjectDatasets team={this.state.team} repo={this.state.repo} datasets={this.state.datasets} refresh={this.refresh}/>;
  }

  render() {
    if (this.state.loading) {
      return <div id="datasets"><DashLoadingSpinner/></div>;
    }

    return (
      <div id="datasets">
        <ProjectAside linkPrefix="/datasets" team={this.state.team} repo={this.state.repo} projects={this.state.projects}/>
        <div className="main-display">
          <div className="main-body">{this.getDatasetsComp()}</div>
        </div>
      </div>
    );
  }
}

export default Datasets;