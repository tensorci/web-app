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
    this.fetchDeployments = this.fetchDeployments.bind(this);
    this.fetchGraphs = this.fetchGraphs.bind(this);
    this.addPubnubListener = this.addPubnubListener.bind(this);
    this.formatChannel = this.formatChannel.bind(this);
    this.listenForGraphUpdates = this.listenForGraphUpdates.bind(this);
    this.unListenForGraphUpdates = this.unListenForGraphUpdates.bind(this);
    this.getMainComp = this.getMainComp.bind(this);

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
    } else if (this.props.uid !== this.state.uid) {
      // TODO: Re-figure out why the above clause (else if (this.props.repo)) needs to
      // check for this.props.repo and the directly above (this.props.uid) doesn't need to be checked for...
      // Deployment was changed, so just refetch graphs for this deployment
      this.fetchGraphs(this.props.uid);
    }
  }

  addPubnubListener() {
    pubnub.addListener({ message: (m) => {
      const data = m.message;
      this.setState({ graphs: data.graphs || [] });
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
        this.listenForGraphUpdates(addUids);
      }

      if (removeUids.length > 0) {
        this.unListenForGraphUpdates(removeUids);
      }

      this.setState({
        projects: data.repos || [],
        graphs: newGraphs,
        repo: repo,
        loading: false
      });
    });
  }

  formatChannel(c){
    return c + ':metrics';
  }

  listenForGraphUpdates(channels) {
    pubnub.subscribe({
      channels: channels.map((c) => { return this.formatChannel(c); })
    });
  }

  unListenForGraphUpdates(channels) {
    pubnub.unsubscribe({
      channels: channels.map((c) => { return this.formatChannel(c); })
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