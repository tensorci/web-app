import React, { Component } from 'react';

class StatusStage extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.data || {};
  }

  render() {
    return (
      <div className="build-output">
        <div className="action-header contents success">
          <div className="ah-wrapper">
            <div className="ah-wrapper-header status-stage">
              <div className="button contents">
                <i className="material-icons">check_circle</i>
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