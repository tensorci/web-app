import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import Graphs from './Graphs';
import NoMetrics from './NoMetrics';
import ProjectAside from '../shared/ProjectAside';
import pubnub from '../../utils/PubSub';

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.fetchAsideContent = this.fetchAsideContent.bind(this);
    this.fetchDeployments = this.fetchDeployments.bind(this);
    this.fetchGraphs = this.fetchGraphs.bind(this);
    this.addPubnubListener = this.addPubnubListener.bind(this);
    this.getMainComp = this.getMainComp.bind(this);
    this.addOrRemoveGraphListeners = this.addOrRemoveGraphListeners.bind(this);

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
    this.addPubnubListener();
    this.fetchAsideContent();
  }

  // TODO: Unsubscribe from all Pubnub channels on componentDidUnmount

  componentDidUpdate() {
    // Entire page data needs to be fetched
    if (this.state.loading) {
      this.fetchAsideContent();
    }
    // Repo has changed, so fetch deployments for that repo
    else if (this.props.repo && (this.props.repo !== this.state.repo)) {
      this.fetchDeployments(this.props.repo);
    }
    // Deployment has changed, so fetch graphs for deployment
    else if (this.props.uid && (this.props.uid !== this.state.uid)) {
      this.fetchGraphs(this.props.uid);
    }
  }

  addPubnubListener() {
    pubnub.addListener({ message: (m) => {
      const data = m.message;

      if (this.graphs) {
        this.graphs.setState({ graphs: data.graphs || [] });
      }
    }});
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

      this.addOrRemoveGraphListeners(newGraphs);

      this.setState({
        projects: data.repos || [],
        graphs: newGraphs,
        repo: repo,
        loading: false
      });
    });
  }

  addOrRemoveGraphListeners(graphs) {
    const newGraphs = graphs || [];

    // create current graph uids map
    var currGraphUids = {};
    this.state.graphs.forEach((g) => {
      currGraphUids[g.uid] = true;
    });

    var newGraphUids = {};
    newGraphs.forEach((g) => {
      newGraphUids[g.uid] = true;
    });

    var removeUids = [];
    for (var uid in currGraphUids) {
      // if current graph uid not in new graph uids map...
      if (!newGraphUids[uid]) {
        // register this as a graph uid to remove.
        removeUids.push(uid);
      }
    }

    var addUids = [];
    for (var uid in newGraphUids) {
      // if current graph uid not in new graph uids map...
      if (!currGraphUids[uid]) {
        // register this as a graph uid to remove.
        addUids.push(uid);
      }
    }

    if (addUids.length > 0) {
      pubnub.subscribe({ channels: addUids });
    }

    if (removeUids.length > 0) {
      pubnub.unsubscribe({ channels: removeUids });
    }
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
    Ajax.get('/api/graphs', { deployment_uid: uid }, (data) => {
      const newGraphs = data.graphs || [];

      this.addOrRemoveGraphListeners(newGraphs);

      this.setState({
        graphs: newGraphs,
        uid: uid
      });
    });
  }

  getMainComp() {
    if (!this.state.graphs || this.state.graphs.length === 0) {
      return <div className="main-body"><NoMetrics team={this.state.team} repo={this.state.repo} pleaseSelect={!this.state.uid}/></div>;
    }

    return <Graphs graphs={this.state.graphs} ref={(r) => { this.graphs = r; }}/>;
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
        <div className="main-display">{this.getMainComp()}</div>
      </div>
    );
  }
}

export default Metrics;