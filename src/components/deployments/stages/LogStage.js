import React, { Component } from 'react';

class LogStage extends Component {

  constructor(props) {
    super(props);

    this.getLogComp = this.getLogComp.bind(this);
    this.getLogs = this.getLogs.bind(this);

    this.state = this.props.data || {};
    this.state.current = this.props.current || false;
    this.state.open = true; // TODO: switch to '= this.state.current;' --> just hardcoding for now.
    this.state.success = true;
  }

  getLogComp() {
    if (!this.state.open) {
      return;
    }

    return (
      <div className={'detail contents' + (this.state.success ? ' success' : '')}>
        <div className="action-log-messages">
          <pre className="output">
            <span className="pre">{this.getLogs()}</span>
          </pre>
        </div>
      </div>
    );
  }

  getLogs() {
    return this.state.logs.map((line, i) => {
      return <span key={i} className="white">{line}</span>;
    });
  }

  render() {
    return (
      <div className="build-output">
        <div className={'action-header contents' + (this.state.open ? ' open' : '') + (this.state.success ? ' success' : '')}>
          <div className="ah-wrapper">
            <div className="header contents">
              <div className="button contents">
                <i class="fa fa-chevron-right right-arrow"></i>
              </div>
              <div className="command contents">
                <span className="stage-name">{this.state.name}</span>
              </div>
            </div>
            <div className="detail-wrapper">{this.getLogComp()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogStage;