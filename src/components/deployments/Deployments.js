import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import DeploymentsList from './DeploymentsList';
import ProjectAside from '../shared/ProjectAside';

class Deployments extends Component {

  constructor(props) {
    super(props);

    this.fetchReposAndDeployments = this.fetchReposAndDeployments.bind(this);
    this.fetchDeployments = this.fetchDeployments.bind(this);
    this.getDeploymentsList = this.getDeploymentsList.bind(this);
    this.refresh = this.refresh.bind(this);

    this.state = {
      loading: true,
      projects: [],
      deployments: [],
      team: this.props.team,
      repo: this.props.repo
    };
  }

  componentDidMount() {
    this.fetchReposAndDeployments();
  }

  componentDidUpdate() {
    if (this.state.loading) {
      // data needs to be fetched
      this.fetchReposAndDeployments();
    } else if (this.props.team !== this.state.team) {
      // Team was changed, so put new team and repo into state and refetch by setting loading to true.
      this.setState({
        loading: true,
        team: this.props.team,
        repo: this.props.repo
      });
    } else if (this.props.repo && (this.props.repo !== this.state.repo)) {
      // Repo was changed, so just refetch deployments for that repo
      this.fetchDeployments(this.props.repo);
    }
  }

  fetchReposAndDeployments() {
    if (!this.state.team) {
      return;
    }

    const payload = {
      team: this.state.team,
      repo: this.state.repo,
      with_deployments: true
    };

    Ajax.get('/api/repos', payload, (data) => {
      data = data || {};
      const repo = data.repo || this.state.repo;

      this.setState({
        projects: data.repos || [],
        deployments: data.deployments || [],
        repo: repo,
        loading: false
      });
    });
  }

  fetchDeployments(repo) {
    const payload = {
      team: this.state.team,
      repo: repo
    };

    Ajax.get('/api/deployments', payload, (data) => {
      this.setState({
        deployments: data.deployments || [],
        repo: repo
      });
    });
  }

  refresh() {
    this.fetchDeployments(this.state.repo);
  }

  getDeploymentsList() {
    if (!this.state.projects || this.state.projects.length === 0) {
      return;
    }

    return <DeploymentsList team={this.state.team} repo={this.state.repo} deployments={this.state.deployments} refresh={this.refresh}/>;
  }

  render() {
    if (this.state.loading) {
      return <div id="deployments"><DashLoadingSpinner/></div>;
    }

    return (
      <div id="deployments">
        <ProjectAside team={this.state.team} repo={this.state.repo} projects={this.state.projects}/>
        <div className="main-display">{this.getDeploymentsList()}</div>
      </div>
    );
  }
}

export default Deployments;