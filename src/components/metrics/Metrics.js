import React, { Component } from 'react';
import Ajax from '../../utils/Ajax';
import DashLoadingSpinner from '../widgets/spinners/DashLoadingSpinner';
import Graph from './Graph';
import NoMetrics from './NoMetrics';
import ProjectAside from '../shared/ProjectAside';
import io from 'socket.io-client';

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.fetchAsideContent = this.fetchAsideContent.bind(this);
    // this.fetchDeployments = this.fetchDeployments.bind(this);
    this.fetchGraphs = this.fetchGraphs.bind(this);
    this.closeAllWebSockets = this.closeAllWebSockets.bind(this);
    this.updateGraphListeners = this.updateGraphListeners.bind(this);

    this.websockets = [];

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

  componentWillUnmount() {
    this.closeAllWebSockets();
  }

  componentWillReceiveProps(nextProps) {
    // ignore this on first render
    if (this.state.loading) {
      return;
    }

    const repoChanged = nextProps.repo !== this.state.repo;
    const deploymentChanged = repoChanged || (nextProps.uid !== this.state.uid);

    // repo changed (which means deployment changed too by default)
    if (repoChanged) {
      // refetch entire page content
      this.fetchAsideContent(nextProps.repo, nextProps.uid);
    }

    // repo stayed the same, but deployment changed
    else if (deploymentChanged) {
      // deployment uid changed and wasn't just removed
      if (nextProps.uid) {
        // fetch graphs for new deployment uid
        this.fetchGraphs(nextProps.uid);
      }
      // deployment uid went from existing to now being blank
      else {
        this.closeAllWebSockets();

        this.setState({
          graphs: [],
          uid: null
        });
      }
    }
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

      this.updateGraphListeners(graphs);

      this.setState({
        projects: data.repos || [],
        graphs: graphs,
        repo: fetchedRepo,
        uid: fetchedUid,
        loading: false
      });
    });
  }

  closeAllWebSockets() {
    // Close all existing websockets.
    this.websockets.forEach((ws) => {
      if (ws) {
        ws.close();
      }
    });

    this.websockets = [];
  }

  updateGraphListeners(newGraphs) {
    newGraphs = newGraphs || [];

    this.closeAllWebSockets();

    var ws;
    newGraphs.forEach((g) => {
      ws = io('/' + g.uid, { path: '/socket.io' });

      ws.on('message', (data) => {
        this.setState({ graphs: data.graphs || [] });
      });

      this.websockets.push(ws);
    });
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

      this.updateGraphListeners(graphs);

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