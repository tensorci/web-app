import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import Graph from './Graph';
import NoMetrics from './NoMetrics';
import ProjectAside from '../shared/ProjectAside';
import pubnub from '../../utils/PubSub';


class Metrics extends Component {

  constructor(props) {
    super(props);

    this.fetchAsideContent = this.fetchAsideContent.bind(this);
    // this.fetchDeployments = this.fetchDeployments.bind(this);
    this.fetchGraphs = this.fetchGraphs.bind(this);
    this.addOrRemoveGraphListeners = this.addOrRemoveGraphListeners.bind(this);
    this.addPubnubListener = this.addPubnubListener.bind(this);

    this.state = {
      loading: true,
      projects: [], // deployments nested inside,
      graphs: [],
      team: this.props.team,
      repo: this.props.repo,
      uid: this.props.uid
    };
  }

  componentDidMount() {
    this.fetchAsideContent(this.state.repo, this.state.uid);
  }

  componentWillReceiveProps(nextProps) {
    // ignore this on first render
    if (this.state.loading) {
      return;
    }

    const repoChanged = nextProps.repo !== this.state.repo;
    const deploymentChanged = repoChanged || (nextProps.uid !== this.state.uid);

    if (repoChanged) {
      this.fetchAsideContent(nextProps.repo, nextProps.uid);
    } else if (deploymentChanged) {
      this.fetchGraphs(nextProps.uid);
    }
  }

  addPubnubListener() {
    pubnub.addListener({ message: (m) => {
      const data = m.message;
      this.setState({ graphs: data.graphs || [] });
    }});
  }

  fetchAsideContent(repo, uid) {
    if (!this.state.team) {
      return;
    }

    const payload = {
      team: this.state.team,
      repo: repo,
      deployment_uid: uid
    };

    Ajax.get('/api/metrics', payload, (data) => {
      const fetchedRepo = data.repo || repo;
      const fetchedUid = data.uid || uid;
      const graphs = data.graphs || [];

      this.addOrRemoveGraphListeners(graphs);

      this.setState({
        projects: data.repos || [],
        graphs: graphs,
        repo: fetchedRepo,
        uid: fetchedUid,
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
  fetchGraphs(uid) {
    Ajax.get('/api/graphs', { deployment_uid: uid }, (data) => {
      const graphs = data.graphs || [];

      this.addOrRemoveGraphListeners(graphs);

      this.setState({
        graphs: graphs,
        uid: uid
      });
    });
  }

  getMainComp() {
    if (!this.state.graphs || this.state.graphs.length === 0) {
      return <NoMetrics team={this.state.team} repo={this.state.repo} pleaseSelect={!this.state.uid}/>;
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