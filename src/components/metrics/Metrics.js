import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import Graphs from './Graphs';
import ProjectAside from '../shared/ProjectAside';

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.fetchAsideContent = this.fetchAsideContent.bind(this);
    // this.fetchDeployments = this.fetchDeployments.bind(this);
    // this.fetchGraphs = this.fetchGraphs.bind(this);

    this.channels = [];

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
    // // Entire page data needs to be fetched
    // if (this.state.loading) {
    //   this.fetchAsideContent();
    // }
    // // Repo has changed, so fetch deployments for that repo
    // else if (this.props.repo && (this.props.repo !== this.state.repo)) {
    //   this.fetchDeployments(this.props.repo);
    // }
    // // Deployment has changed, so fetch graphs for deployment
    // else if (this.props.uid && (this.props.uid !== this.state.uid)) {
    //   this.fetchGraphs(this.props.uid);
    // }
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
      const newGraphs = data.graphs || [];

      this.setState({
        projects: data.repos || [],
        graphs: newGraphs,
        repo: repo,
        loading: false
      });
    });
  }
  //
  // fetchDeployments(repo) {
  //   const payload = {
  //     team: this.state.team,
  //     repo: repo
  //   };
  //
  //   Ajax.get('/api/deployments', payload, (data) => {
  //     // clone projects from state
  //     var projects = this.state.projects.map((p) => {
  //       return p;
  //     });
  //
  //     var p;
  //     for (var i = 0; i < projects.length; i++) {
  //       p = projects[i];
  //
  //       if (p.slug === repo) {
  //         // update deployments for project
  //         p.deployments = data.deployments || [];
  //         break;
  //       }
  //     }
  //
  //     // update projects on state
  //     this.setState({
  //       projects: projects,
  //       repo: repo
  //     });
  //   });
  // }
  //
  // fetchGraphs(uid) {
  //   Ajax.get('/api/graphs', { deployment_uid: uid }, (data) => {
  //     const newGraphs = data.graphs || [];
  //
  //     this.addOrRemoveGraphListeners(newGraphs);
  //
  //     this.setState({
  //       graphs: newGraphs,
  //       uid: uid
  //     });
  //   });
  // }

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
          <Graphs graphs={this.state.graphs} team={this.state.team} repo={this.state.repo} pleaseSelect={!this.state.uid} ref={(r) => { this.graphs = r; }}/>
        </div>
      </div>
    );
  }
}

export default Metrics;