import React, { Component } from 'react';

class StatusStage extends Component {

  constructor(props) {
    super(props);

    this.getIcon = this.getIcon.bind(this);

    this.state = this.props.data || {};
    this.state.current = this.props.current || false;
    this.state.success = true;
  }

  getIcon() {
    if (this.state.success) {
      return <i className="material-icons success">check_circle</i>;
    }
  }

  render() {
    return (
      <div className="build-output">
        <div className={'action-header contents' + (this.state.success ? ' success' : '')}>
          <div className="ah-wrapper">
            <div className="ah-wrapper-header status-stage">
              <div className="button contents">{this.getIcon()}</div>
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