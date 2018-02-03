import React, { Component } from 'react';
import Graph from './Graph';

class Graphs extends Component {

  constructor(props) {
    super(props);

    this.formatGraphs = this.formatGraphs.bind(this);

    this.state = {
      graphs: this.props.graphs || []
    };
  }

  formatGraphs() {
    return this.state.graphs.map((graph, i) => {
      return <Graph key={i} {...graph}/>;
    });
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