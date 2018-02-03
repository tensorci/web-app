import React, { Component } from 'react';
import Graph from './Graph';
import NoMetrics from './NoMetrics';
import pubnub from '../../utils/PubSub';

class Graphs extends Component {

  constructor(props) {
    super(props);

    this.formatGraphs = this.formatGraphs.bind(this);

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

  formatGraphs(graphs, team, repo, pleaseSelect) {
    if (!graphs || graphs.length === 0) {
      return <NoMetrics team={team} repo={repo} pleaseSelect={pleaseSelect}/>;
    }

    const graphUids = graphs.map((g) => { return g.uid; });

    pubnub.subscribe({ channels: graphUids });

    return graphs.map((graph, i) => {
      return <Graph key={i} {...graph}/>;
    });
  }

  // addOrRemoveGraphListeners(graphs) {
  //   const newGraphs = graphs || [];
  //
  //   // create current graph uids map
  //   var currGraphUids = {};
  //   this.state.graphs.forEach((g) => {
  //     currGraphUids[g.uid] = true;
  //   });
  //
  //   var newGraphUids = {};
  //   newGraphs.forEach((g) => {
  //     newGraphUids[g.uid] = true;
  //   });
  //
  //   var removeUids = [];
  //   for (var uid in currGraphUids) {
  //     // if current graph uid not in new graph uids map...
  //     if (!newGraphUids[uid]) {
  //       // register this as a graph uid to remove.
  //       removeUids.push(uid);
  //     }
  //   }
  //
  //   var addUids = [];
  //   for (var uid in newGraphUids) {
  //     // if current graph uid not in new graph uids map...
  //     if (!currGraphUids[uid]) {
  //       // register this as a graph uid to remove.
  //       addUids.push(uid);
  //     }
  //   }
  //
  //   if (addUids.length > 0) {
  //     pubnub.subscribe({ channels: addUids });
  //   }
  //
  //   if (removeUids.length > 0) {
  //     pubnub.unsubscribe({ channels: removeUids });
  //   }
  // }

  render() {
    const graphs = this.props.graphs || [];
    const team = this.props.team;
    const repo = this.props.repo;
    const pleaseSelect = this.props.pleaseSelect;

    return (
      <div className="main-body">
        {this.formatGraphs(graphs, team, repo, pleaseSelect)}
      </div>
    );
  }
}

export default Graphs;