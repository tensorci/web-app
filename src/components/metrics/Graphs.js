import React, { Component } from 'react';
import Graph from './Graph';
import NoMetrics from './NoMetrics';
import pubnub from '../../utils/PubSub';

class Graphs extends Component {

  constructor(props) {
    super(props);

    this.formatGraphs = this.formatGraphs.bind(this);
    this.addPubnubListener = this.addPubnubListener.bind(this);

    this.state = {
      graphs: this.props.graphs || [],
      team: this.props.team,
      repo: this.props.repo,
      pleaseSelect: this.props.pleaseSelect
    };

    this.channelsMap = {};
    // TODO: Unsubscribe from all Pubnub channels on componentDidUnmount
  }

  componentDidMount() {
    this.addPubnubListener();
  }

  addPubnubListener() {
    pubnub.addListener({ message: (m) => {
      const data = m.message;
      this.setState({ graphs: data.graphs || [] });
    }});
  }

  formatGraphs() {
    console.log('heard format graphs', this.state.graphs);

    this.addOrRemoveGraphListeners(this.state.graphs);

    if (!this.state.graphs || this.state.graphs.length === 0) {
      return <NoMetrics team={this.state.team} repo={this.state.repo} pleaseSelect={this.state.pleaseSelect}/>;
    }

    return this.state.graphs.map((graph, i) => {
      return <Graph key={i} {...graph}/>;
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

  render() {
    return (
      <div className="main-body">
        {this.formatGraphs()}
      </div>
    );
  }
}

export default Graphs;