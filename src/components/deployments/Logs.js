import React, { Component } from 'react';

class Logs extends Component {

  constructor(props) {
    super(props);

    this.getLogs = this.getLogs.bind(this);

    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    // stream logs and update state
  }

  getLogs() {
    return this.state.logs.map((line, i) => {
      return <span key={i} className="pre">{line}</span>;
    });
  }

  render() {
    const team = this.props.team;
    const repo = this.props.repo;
    const uid = this.props.uid;

    return (
      <div className="log-container card">
        <div className="action-log-messages">
          <pre className="output">{this.getLogs()}</pre>
        </div>
      </div>
    );
  }
}

export default Logs;