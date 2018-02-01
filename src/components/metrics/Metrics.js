import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import Graph from './Graph';
import NoMetrics from './NoMetrics';
import ProjectAside from '../shared/ProjectAside';

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.fetchAsideContent = this.fetchAsideContent.bind(this);
    this.fetchDeployments = this.fetchDeployments.bind(this);
    this.fetchGraphs = this.fetchGraphs.bind(this);

    this.state = {
      loading: true,
      projects: [], // deployments nested inside
      graphs: [],
      team: this.props.team,
      repo: this.props.repo,
      uid: this.props.uid
    };
  }

  componentDidMount() {
    this.fetchAsideContent();
  }

  componentDidUpdate() {
    if (this.state.loading) {
      // data needs to be fetched
      this.fetchAsideContent();
    } else if (this.props.team !== this.state.team) {
      // Team was changed, so put new team and repo into state and refetch by setting loading to true.
      this.setState({
        loading: true,
        team: this.props.team,
        repo: this.props.repo,
        uid: this.props.uid
      });
    } else if (this.props.repo && (this.props.repo !== this.state.repo)) {
      // Repo was changed, so just refetch deployments for that repo
      this.fetchDeployments(this.props.repo);
    } else if (this.props.uid && (this.props.uid !== this.state.uid)) {
      // Deployment was changed, so just refetch graphs for this deployment
      this.fetchGraphs(this.props.uid);
    }
  }

  fetchAsideContent() {
    if (!this.state.team) {
      return;
    }

    const payload = {
      team: this.state.team,
      repo: this.state.repo,
      deployment_uid: this.state.uid
    };

    Ajax.get('/api/metrics', payload, (data) => {
      const repo = data.repo || this.state.repo;

      this.setState({
        projects: data.repos || [],
        graphs: data.graphs || [],
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
      // clone projects from state
      var projects = this.state.projects.map((p) => {
        return p;
      });

      var p;
      for (var i = 0; i < projects.length; i++) {
        p = projects[i];

        if (p.slug === repo) {
          // update deployments for project
          p.deployments = data.deployments || [];
          break;
        }
      }

      // update projects on state
      this.setState({
        projects: projects,
        repo: repo
      });
    });
  }

  fetchGraphs(uid) {
    const payload = {
      deployment_uid: uid
    };

    Ajax.get('/api/graphs', payload, (data) => {
      this.setState({
        graphs: data.graphs || [],
        uid: uid
      });
    });
  }

  getMainComp() {
    if (!this.state.graphs || this.state.graphs.length === 0) {
      return <NoMetrics/>;
    }

    return this.state.graphs.map((graph, i) => {
      return <Graph key={i} {...graph}/>;
    });
  }

  render() {
    if (this.state.loading) {
      return <div id="metrics"><DashLoadingSpinner/></div>;
    }

    return (
      <div id="metrics">
        <ProjectAside
          linkPrefix="/metrics"
          team={this.state.team}
          repo={this.state.repo}
          deploymentUid={this.state.uid}
          projects={this.state.projects}/>
        <div className="main-display">
          <div className="main-body">{this.getMainComp()}</div>
        </div>
      </div>
    );
  }
}

export default Metrics;