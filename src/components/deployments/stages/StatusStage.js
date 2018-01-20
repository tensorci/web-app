import React, { Component } from 'react';

class StatusStage extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.data || {};
    this.state.current = this.props.current || false;
    this.state.success = true;
  }

  render() {
    return (
      <div className="build-output">
        <div className={'action-header contents' + (this.state.success ? ' success' : '')}>
          <div className="ah-wrapper">
            <div className="header contents">
              <div className="button contents">
                <i className="fa fa-success stage-status-icon"></i>
              </div>
              <div className="command contents">
                <span className="stage-name">{this.state.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatusStage;